import React, {useState, useContext, useEffect} from "react";
import { BaseContext } from '../ContextProviders/BaseContextProvider';
import Feedback from "../Partials/Feedback";
import Loading from "../Loading";

const UserUpdate = ()=>{

    const [base] = useContext(BaseContext);
    const [accountCreated, setAccountCreated] = useState(false);
    const [editing, setEditing] = useState(false);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const [formState, setFormState] = useState(null);
    const id = base.credentials.userId;

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
    }, [base.urls.userDetail, base.credentials.accessToken, id]);

    const setInitialFormState = (data)=>{
        console.log(data)
        const formItems = { name: data[0].name, email: data[0].email, password: '' };
        setFormState(formItems)
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

    const setMyStates = (result)=>{
        if(result.status!==200){
            setFormState({name:'', email:''});
            setFeedback({active: true, message : 'Houve um erro na atualização dos dados.', status:'error'});
        }else{
            setFeedback({active: true, message : 'Dados atualizadps com sucesso!', status:'success'});
            setAccountCreated(true);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    }

    let output;
    if(!accountCreated && !editing && formState) {
        output = (
            <>
                <h2 className="mb-5">Seus Dados</h2>
                <Feedback params={feedback}/>
                <div className="mb-3">
                    <label htmlFor="name"><strong>Nome:</strong></label><br/>
                    {formState.name}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="mt-3"><strong>Email:</strong></label><br/>
                    {formState.email}
                    </div>
                <div className="mb-3">
                    <label htmlFor="password" className="mt-3"><strong>Senha:</strong></label><br/>
                    ******
                </div>
                <button onClick={()=>setEditing(true)} type="submit" className="btn btn-primary btn-block mt-3">EDITAR</button>
            </>
        )
    }else if(!accountCreated && editing && formState){
        output = (
            <>
                <h2 className="mb-5">Editar seus Dados</h2>
                <Feedback params={feedback}/>
                <label htmlFor="name">Nome:</label>
                <input type="text" name="name" className="form-control" value={formState.name} onChange={handleChange}/>

                <label htmlFor="email" className="mt-3">Email:</label>
                <input required={true} type="email" name="email" className="form-control" value={formState.email} onChange={handleChange}/>

                <label htmlFor="password" className="mt-3">Senha:</label>
                <input required={true} type="password" name="password" className="form-control" value={formState.password} onChange={handleChange}/>

                <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mt-3">ENVIAR</button>
            </>
        );
    }else if(accountCreated && feedback){
        output = <Feedback params={feedback}/>;
    }else{
        output = <Loading />
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {output}
                </div>
            </div>
        </div>
    )
}

export default UserUpdate;