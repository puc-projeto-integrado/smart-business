import React, {useState} from "react";

const UserRegister = ()=>{

    const [email, setEmail] = useState('gab@gab.com');
    const [password, setPassword] = useState('admin123');
    const [feedbackActive, setFeedbackActive] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const Feedback = (props)=>{
        return props.active ? <div>{props.message}</div> : <div></div>;
    }

    const handleSubmit = ()=>{

    }

    const handleChange = ()=>{

    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">

                    <h1 className="mb-5">CRIE SUA CONTA</h1>

                    <form onSubmit={handleSubmit}>
                        <Feedback active={feedbackActive} message={feedbackMessage}/>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" className="form-control" value={email} onChange={handleChange}/>
                        <label htmlFor="password" className="mt-3" >Senha:</label>
                        <input type="password" name="password" className="form-control" value={password} onChange={handleChange}/>
                        <button type="submit" className="btn btn-primary btn-block mt-3">ENVIAR</button>
                    </form>

                </div>
            </div>
        </div>
    )

}

export default UserRegister;