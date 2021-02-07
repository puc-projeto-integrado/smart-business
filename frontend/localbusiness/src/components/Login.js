import React, {useContext, useState} from 'react';
import { bake_cookie, delete_cookie } from 'sfcookies';
import { BaseContext } from './ContextProviders/BaseContextProvider';

const Login = (props) => {

    const [base] = useContext(BaseContext);
    const [email, setEmail] = useState('gab@gab.com');
    const [password, setPassword] = useState('admin123');
    const [feedbackActive, setFeedbackActive] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleChange = (event) => {
        setFeedbackActive(false)
        event.target.name==='email' ? setEmail(event.target.value) : setPassword(event.target.value)
    }

    const handleSubmit = (event)=>{
        event.preventDefault();

        if(email==='' || password===''){
            setFeedbackActive(true);
            setFeedbackMessage('Todos os campos são obrigatórios.');
            return false;
        }

        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);

        let requestOptions = {
            method: 'POST',
            headers: headers,
            body: urlencoded,
        };

        fetch(base.urls.login, requestOptions)
            .then(response => response.json())
            .then(data => setMyStates(data))
            .catch(error => console.log('error', error));
    }

    const setMyStates = (response)=>{

        if(response.status!==200){
            setEmail('');
            setPassword('');
            setFeedbackActive(true);
            setFeedbackMessage('Erro de autenticação.');
        }else{
            setFeedbackActive(false);
            delete_cookie('credentials')
            console.log('-> ', response.body)
            bake_cookie('credentials', response.body);
            props.functionRefs.redirect('/dashboard');
        }
    }

    if(base) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2">

                        <h1 className="mb-5">LOGIN</h1>

                        <form onSubmit={handleSubmit}>
                            <Feedback active={feedbackActive} message={feedbackMessage}/>
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" className="form-control" value={email} onChange={handleChange}/>
                            <label htmlFor="password" className="mt-3">Senha:</label>
                            <input type="password" name="password" className="form-control" value={password} onChange={handleChange}/>
                            <button type="submit" className="btn btn-primary btn-block mt-3">ENVIAR</button>
                        </form>

                        <p className="mt-4"><em className="fa fa-user-circle gray-4"></em> <a href="/user/register">Criar uma conta gratuitamente agora.</a></p>

                    </div>
                </div>
            </div>
        )
    }
}

const Feedback = (props)=>{
    return props.active ? <div className="alert alert-danger" role="alert">{props.message}</div> : <div></div>;
}

export default Login;