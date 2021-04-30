import React, {useContext, useState} from "react";
import Feedback from "../../Partials/Feedback";
import {UtilsContext, UtilsContextProvider} from "../../ContextProviders/UtilsContextProvider";
import InputText from "../../Partials/InputText";
import {CommonCredentials, CommonUrls} from "../../Common";

const AdminAddRole = ()=>{
    const [utils] = useContext(UtilsContext);
    const [formState, setFormState] = useState({'name': ''});
    const [roleActions, setRoleActions] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [counter, setCounter] = useState(1);
    let output;

    const setMyStates = (result)=>{
        console.log('RES ', result.status)
        console.log('RES ', result)
        if(result.status!=='success'){
            setFeedback({active: true, message : 'Houve um erro na atualização dos dados.', status:'error'});
        }else{
            setFeedback({active: true, message : 'Dados atualizadps com sucesso!', status:'success'});
        }
    }

    const handleSubmit = ()=>{
        let roleActionsArray = [];
        for(let i=1; i<roleActions.length+1; i++){
            let rowRoleActions = {
                'name' : formState[`role_action_name_${i}`],
                'route' : formState[`route_${i}`]
            }
            roleActionsArray.push(rowRoleActions);
        }

        let obj = { 'role_name':formState["name"], 'roleActions' : roleActionsArray }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${CommonCredentials.accessToken}`);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = { method: 'POST', headers: myHeaders, body: JSON.stringify(obj) };

        fetch(CommonUrls.roleAdd, requestOptions)
            .then(response => response.json())
            .then(result => setMyStates(result))
            .catch(error => console.log('error', error));
    }

    const removeRoleAction = (e, idFilter)=> setRoleActions(roleActions.filter(item => item.id !== idFilter));

    const handleAddRoleAction = ()=>{
        setCounter(counter+1);
        let obj = {'id':counter, 'name':'', 'route':''}
        let arrayTmp = roleActions.concat(obj);
        setRoleActions(arrayTmp);
    }

    if(roleActions.length>0){
        output = roleActions.map((item)=>{
            return (
                <div className="row" key={item.id}>
                    <div className="col-5">
                        <InputText handleChange={(e)=>utils.handleFormChange(e, setFormState)} value={formState[`role_action_name_${item.id}`]} name={`role_action_name_${item.id}`} label="Nome da Permissão"/></div>
                    <div className="col-5">
                        <InputText handleChange={(e)=>utils.handleFormChange(e, setFormState)} value={formState[`route_${item.id}`]} name={`route_${item.id}`} label="Path (rota)"/></div>
                    <div className="col-1"><button style={{"position":"absolute", "bottom":"0px"}} onClick={(e)=>removeRoleAction(e, item.id)} className="btn btn-outline-primary">remover</button></div>
                </div>
            )
        });
    }

    let stateBeforeFormSubmition = (
            <>
            <InputText name="name" label="Nome" value={formState["name"]} handleChange={(e)=>utils.handleFormChange(e, setFormState)}/>
            <button onClick={handleAddRoleAction} className="btn btn-secondary mt-3">Adicionar Permissão</button>
            {output}
            <button onClick={handleSubmit} className="btn btn-primary btn-block mt-3">SALVAR</button>
            </>
        );

    return (
        <main className="container">
            <div className="row">
                <div className="col-sm-12 col-md-12  pt-5">
                    <h2>Criar Perfil de Acesso</h2>
                    {!feedback? <div>{stateBeforeFormSubmition}</div> : <Feedback params={feedback}/>}
                </div>
            </div>
        </main>
    )
}

export default AdminAddRole;