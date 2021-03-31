import React, {useContext, useEffect, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import {useParams} from "react-router";
import Feedback from "../../Partials/Feedback";
import Loading from "../../Loading";

const AdminUpdateBusiness = ()=>{

    const [base] = useContext(BaseContext);
    const [dataUpdated, setDataUpdated] = useState(false);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const [formState, setFormState] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${base.urls.userDetail}/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => setInitialFormState(data))
            .catch(error => console.log('error', error));
    }, [base.urls.userDetail]);

    const setInitialFormState = (data)=>{
        console.log(data)
        const formItems = { name: data[0].name, email: data[0].email, password: '' };
        setFormState(formItems)
    }

    const setMyStates = (result)=>{
        if(result.status!==200){
            setFormState({name:'', email:''});
            setFeedback({active: true, message : 'Houve um erro na atualização dos dados.', status:'error'});
        }else{
            setFeedback({active: true, message : 'Dados atualizadps com sucesso!', status:'success'});
            setDataUpdated(true);
        }
    }
    const listContains = (list, item)=>{
        let exists = false;
        list.forEach((listItem)=>{
            if(item.trim()===listItem.trim()){
                exists = true;
            }
        })
        return exists;
    }
    const handleSubmit = (event)=>{
        let canProceed = true;
        let exceptions = ['password']
        Object.keys(formState).forEach((key)=>{
            if(!formState[key] && !listContains(exceptions, key)){
                console.log('Failed field ', key)
                canProceed = false;
                setFeedback({active: true, message : 'Todos os campos são obrigatórios.', status:'error'});
            }
        })

        if(canProceed){
            console.log('updating...')
            let headers = new Headers();
            headers.append("Content-Type", "application/x-www-form-urlencoded");

            let urlencoded = new URLSearchParams();
            urlencoded.append("id", id);
            urlencoded.append("name", formState.name);
            urlencoded.append("email", formState.email);
            urlencoded.append("password", formState.password);

            let requestOptions = {
                method: 'PUT',
                headers: headers,
                body: urlencoded,
            };
            console.log(urlencoded)
            fetch(base.urls.userUpdate, requestOptions)
                .then(data => setMyStates(data))
                .catch(error => console.log('error', error));
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    }

    let output;

    if(formState && !dataUpdated){
        output = (
            <>
                <Feedback params={feedback}/>
                <label htmlFor="name">Nome:</label>
                <input type="text" name="name" className="form-control" value={formState.name} onChange={handleChange}/>

                <label htmlFor="email" className="mt-3">Email:</label>
                <input required={true} type="email" name="email" className="form-control" value={formState.email} onChange={handleChange}/>

                <label htmlFor="password" className="mt-3">Senha:</label>
                <input required={true} type="password" name="password" className="form-control" value={formState.password} onChange={handleChange}/>
                <small>[Opcional] Deixe em branco para não alterar a senha.</small>
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