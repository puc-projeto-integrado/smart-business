import React, {useState, useContext} from "react";
import { BaseContext } from '../ContextProviders/BaseContextProvider';
import Feedback from "../Partials/Feedback";

const UserUpdate = ()=>{

    const [base] = useContext(BaseContext);
    const [accountCreated, setAccountCreated] = useState(false);
    const [editing, setEditing] = useState(false);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});

    const formItems = { name: "FooCia", email: "foo@foo.com", password: "foo.com.br" };
    const [state, setState] = useState(formItems);

    const handleSubmit = (event)=>{
        let canProceed = true;
        Object.keys(state).forEach((key)=>{
            if(!state[key]){
                canProceed = false;
                setFeedback({active: true, message : 'Todos os campos são obrigatórios.', status:'error'});
            }
        })

        if(canProceed){
            
            let headers = new Headers();
            headers.append("Content-Type", "application/x-www-form-urlencoded");

            let urlencoded = new URLSearchParams();
            urlencoded.append("name", state.name);
            urlencoded.append("email", state.email);
            urlencoded.append("password", state.password);

            let requestOptions = {
                method: 'POST',
                headers: headers,
                body: urlencoded,
            };

            fetch(base.urls.userRegister, requestOptions)
                .then(response => response.json())
                .then(data => setMyStates(data))
                .catch(error => console.log('error', error));
        }

    }

    const setMyStates = (result)=>{
        console.log(result)
        if(result.status!==200){
            setState({name:'', email:'', password:''});
            setFeedback({active: true, message : 'Houve um erro na criação de sua conta.', status:'error'});
        }else{
            setFeedback({active: false, message : 'Conta criada com sucesso!', status:'success'});
            setAccountCreated(true);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    let output;
    if(!accountCreated && !editing) {
        output = (
            <>
                <Feedback params={feedback}/>
                <div className="mb-3">
                <label htmlFor="name"><strong>Nome:</strong></label><br/>
                {state.name}
                </div>
                <div className="mb-3">
                <label htmlFor="email" className="mt-3"><strong>Email:</strong></label><br/>
                {state.email}
                </div>
                <div className="mb-3">
                <label htmlFor="password" className="mt-3"><strong>Senha:</strong></label><br/>
                ******
                </div>
                <button onClick={()=>setEditing(true)} type="submit" className="btn btn-primary btn-block mt-3">EDITAR</button>
            </>
        )
    }else if(!accountCreated && editing){
        output = (
            <>
                <Feedback params={feedback}/>
                <label htmlFor="name">Nome:</label>
                <input type="text" name="name" className="form-control" value={state.name} onChange={handleChange}/>

                <label htmlFor="email" className="mt-3">Email:</label>
                <input required={true} type="email" name="email" className="form-control" value={state.email} onChange={handleChange}/>

                <label htmlFor="password" className="mt-3">Senha:</label>
                <input required={true} type="password" name="password" className="form-control" value={state.password} onChange={handleChange}/>

                <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mt-3">ENVIAR</button>
            </>
        );
    }else{
        output = <div className="alert alert-success" role="alert">Conta criada com sucesso!</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-5">Seus Dados</h2>
                    {output}
                </div>
            </div>
        </div>
    )
    
}

export default UserUpdate;