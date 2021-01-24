import React, {useState, useEffect} from 'react';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const urlLogin = 'http://localhost/public/api/login';

const Login = () => {

    const [email, setEmail] = useState('gab@gab.com');
    const [password, setPassword] = useState('admin123');
    const [feedbackActive, setFeedbackActive] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [responseData, setResponseData] = useState(null);

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
            redirect: 'follow'
        };

        fetch(urlLogin, requestOptions)
            .then(response => response.json())
            .then(response => setMyStates(response))
            .catch(error => console.log('error', error));
    }

    const setMyStates = (response)=>{
        setResponseData(response)

        if(response.status!==200){
            setEmail('');
            setPassword('');
            setFeedbackActive(true);
            setFeedbackMessage('Erro de autenticação.');
        }else{
            setFeedbackActive(false);

            if(read_cookie('credentials')){
                delete_cookie('credentials')
            }

            bake_cookie('credentials', response.body);

            console.log('COOKIE', read_cookie('credentials'));
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h1>LOGIN</h1>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <Feedback active={feedbackActive} message={feedbackMessage}/>
                <div className="row mt-3">

                    <div className="col-md-6">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" className="form-control" value={email} onChange={handleChange}/>
                        <label htmlFor="password" className="mt-3" >Senha:</label>
                        <input type="password" name="password" className="form-control" value={password} onChange={handleChange}/>
                        <button type="submit" className="mt-3">ENVIAR</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const Feedback = (props)=>{
    return props.active ? <div>{props.message}</div> : <div></div>;
}

export default Login;