import React, {useState, useEffect} from 'react';

const urlLogin = 'http://localhost/public/api/login';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleChange = (event) => {
        event.target.name==='email' ? setEmail(event.target.value) : setPassword(event.target.value)
    }

    const handleSubmit = (event)=>{
        event.preventDefault();

        if(email==='' || password===''){
            console.log('Stop submiting...')
            return false;
        }

        console.log('Submiting form...')

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
            .then(response => setResponseData(response))
            .catch(error => console.log('error', error));
    }

    if(responseData) {
        console.log('Status ', responseData)
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h1>LOGIN</h1>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
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

export default Login;