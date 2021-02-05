import React, {useState, useContext} from "react";
import {bake_cookie, delete_cookie} from "sfcookies";
import { BaseContext } from '../ContextProviders/BaseContextProvider';

const UserRegister = (props)=>{

    const [base] = useContext(BaseContext);
    const [accountCreated, setAccountCreated] = useState(false);
    const [feedbackActive, setFeedbackActive] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const formItems = { name: "FooCia", email: "foo@foo.com", password: "foo.com.br" };
    const [state, setState] = useState(formItems);

    const Feedback = (props)=>{
        return props.active ? <div className="alert alert-danger" role="alert">{props.message}</div> : <div></div>;
    }

    const handleSubmit = (event)=>{
        event.preventDefault();

        let canProceed = true;
        Object.keys(state).map((key)=>{
            if(!state[key]){
                canProceed = false;
                setFeedbackActive(true);
                setFeedbackMessage('Todos os campos são obrigatórios.');
                return false;
            }
            return '';
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

    const setMyStates = (response)=>{
        console.log(response)
        if(response.status!==200){
            setState({name:'', email:'', password:''});
            setFeedbackActive(true);
            setFeedbackMessage('Houve um erro na criação de sua conta.');
        }else{
            setFeedbackActive(false);
            setAccountCreated(true);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    if(base) {
        if(!accountCreated) {
            return (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">

                            <h1 className="mb-5">CRIE SUA CONTA</h1>

                            <form onSubmit={handleSubmit}>
                                <Feedback active={feedbackActive} message={feedbackMessage}/>

                                <label htmlFor="name">Nome:</label>
                                <input type="text" name="name" className="form-control" value={state.name} onChange={handleChange}/>

                                <label htmlFor="email" className="mt-3">Email:</label>
                                <input required={true} type="email" name="email" className="form-control" value={state.email} onChange={handleChange}/>

                                <label htmlFor="password" className="mt-3">Senha:</label>
                                <input required={true} type="password" name="password" className="form-control" value={state.password} onChange={handleChange}/>

                                <button type="submit" className="btn btn-primary btn-block mt-3">ENVIAR</button>
                            </form>

                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <h1 className="mb-5">CRIE SUA CONTA</h1>
                            <div className="alert alert-success" role="alert">Conta criada com sucesso!</div>
                        </div>
                    </div>
                </div>
            )
        }
    }else{
        return null;
    }
}

export default UserRegister;