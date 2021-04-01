import React, {useContext, useEffect, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import {useParams} from "react-router";
import Feedback from "../../Partials/Feedback";
import Loading from "../../Loading";

const AdminUpdateBusiness = ()=>{
    const [base] = useContext(BaseContext);
    const [utils] = useContext(UtilsContext);
    const [dataUpdated, setDataUpdated] = useState(false);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const [formState, setFormState] = useState(null);
    const {id} = useParams();
    let rows;
    let output;
    const exceptions = ['password', 'id', 'highlight', 'facebook_address', 'twitter_address', 'ip', 'phone'];

    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(`${base.urls.businessDetail}/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => utils.setInitialFormState(data, setFormState))
            .catch(error => console.log('error', error));
    }, [base.urls.businessDetail, base.credentials.accessToken, id]);

    const getNiceName = (key)=>{
        let names = { name : 'Nome', email : 'Email', cnpj : 'CNPJ', website : 'Website', description : 'Descrição', address : 'Endereço', district : 'Bairro', phone : 'Telefone' };
        return names[key];
    }

    const setMyStates = (result)=>{
        if(result.status!==200){
            setFeedback({active: true, message : 'Houve um erro na atualização dos dados.', status:'error'});
        }else{
            setFeedback({active: true, message : 'Dados atualizados com sucesso!', status:'success'});
            setDataUpdated(true);
        }
    }

    const handleSubmit = (event)=>{
        let canProceed = true;
        Object.keys(formState).forEach((key)=>{
            if(!formState[key] && !utils.listContains(exceptions, key)){
                console.log('Failed field ', key)
                canProceed = false;
                setFeedback({active: true, message : 'Todos os campos são obrigatórios.', status:'error'});
            }
        })

        if(canProceed){
            let headers = new Headers();
            headers.append("Content-Type", "application/x-www-form-urlencoded");
            headers.append("Authorization", `Bearer ${base.credentials.accessToken}`);

            let urlencoded = new URLSearchParams();
            urlencoded.append("id", id)
            Object.keys(formState).forEach((key) => {
                if(getNiceName(key)){
                    urlencoded.append(key, formState[key])
                }
            });

            let requestOptions = {
                method: 'PUT',
                headers: headers,
                body: urlencoded,
            };

            fetch(base.urls.businessUpdate, requestOptions)
                .then(data => setMyStates(data))
                .catch(error => console.log('error', error));
        }
    }

    if(formState && !dataUpdated){
        let objToArray = Object.keys(formState);
        rows = objToArray.map((key)=>{
            if(getNiceName(key)){
                return (
                    <div className="mb-3" key={key}>
                        <label htmlFor="name"><strong>{getNiceName(key)}:</strong></label><br/>
                        <input type="text" name={key} className="form-control" value={formState[key]} onChange={(e)=>utils.handleFormChange(e, setFormState)}/>
                    </div>
                )
            }else{
                return '';
            }
        })
        output = (
            <>
                <Feedback params={feedback}/>
                {rows}
                <Feedback params={feedback}/>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mt-3">SALVAR</button>
            </>
        );
    }else if(formState && dataUpdated){
        output = <Feedback params={feedback}/>
    }else{
        output = <Loading/>
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-5">Editar Dados</h2>
                    {output}
                </div>
            </div>
        </div>
    )
}

export default AdminUpdateBusiness;