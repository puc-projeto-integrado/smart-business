import React, {useContext, useState} from "react";
import Feedback from "../../Partials/Feedback";
import {UtilsContext, UtilsContextProvider} from "../../ContextProviders/UtilsContextProvider";
import InputText from "../../Partials/InputText";

const AdminAddRole = ()=>{
    const [utils] = useContext(UtilsContext);
    const [formState, setFormState] = useState({'name': ''});
    const [roleActions, setRoleActions] = useState([]);
    const [counter, setCounter] = useState(1);
    const labels = { name : 'Nome'};

    const handleSubmit = ()=>{
        return true;
    }

    const removeRoleAction = (e, id)=>{
        console.log('ID ', id)
        return true;
    }

    const handleAddRoleAction = ()=>{
        let tmp = counter;
        setCounter(tmp+1);
        let obj = {'id':counter, 'name':'', 'route':''}
        let arrayTmp = roleActions.concat(obj);
        setRoleActions(arrayTmp);
        console.log('ROLES ', roleActions)
    }

    let output;
    if(roleActions.length>0){
        output = roleActions.map((item)=>{
            return (
                <div className="row" key={item.id}>
                    <div className="col-5"><InputText label="Nome da Permissão"/></div>
                    <div className="col-5"><InputText label="Path (rota)"/></div>
                    <div className="col-1">
                        <button style={{"position":"absolute", "bottom":"0px"}} onClick={(e)=>removeRoleAction(e, item.id)} className="btn btn-outline-primary">remover</button>
                    </div>
                </div>
            )
        });
    }

    return (
        <main className="container">
            <div className="row">
                <div className="col-sm-12 col-md-12  pt-5">
                    <h2>Criar Perfil de Acesso</h2>
                    <InputText name="name" label="Nome" value={formState["name"]} handleChange={(e)=>utils.handleFormChange(e, setFormState)}/>
                    <button onClick={handleAddRoleAction} className="btn btn-secondary mt-3">Adicionar Permissão</button>
                    {output}
                    <button onClick={handleSubmit} className="btn btn-primary btn-block mt-3">SALVAR</button>
                </div>
            </div>
        </main>
    )
}

export default AdminAddRole;