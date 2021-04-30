import React from "react";
import {useParams} from "react-router";
import {CommonUrls} from "./Common";
import {bake_cookie, delete_cookie} from "sfcookies";

const OauthHandoff = ()=>{
    const {email, name} = useParams();

    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("name", name);
    urlencoded.append("email", email);
    urlencoded.append("password", "9999");

    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: urlencoded,
    };

    fetch(CommonUrls.userRegister, requestOptions)
        .then(response => response.json())
        .then(data => doLogin(data))
        .catch(error => console.log('error', error));

    const doLogin = (result)=>{
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", "9999");

        let requestOptions = {
            method: 'POST',
            headers: headers,
            body: urlencoded,
        };

        fetch(CommonUrls.login, requestOptions)
            .then(response => response.json())
            .then(data => setMyStates(data))
            .catch(error => console.log('error', error));
    }

    const setMyStates = (response)=>{
        if(response.status!==200){

        }else{
            delete_cookie('credentials')
            console.log('-> ', response.body)
            bake_cookie('credentials', response.body);
            window.location='/dashboard';
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-5">Ver Dados</h2>
                    <p>Concluindo o processo de autenticação. Por favor, aguarde.</p>
                </div>
            </div>
        </div>
    )
}

export default OauthHandoff;