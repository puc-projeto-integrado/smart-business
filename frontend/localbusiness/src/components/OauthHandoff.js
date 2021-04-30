import React, {useEffect, useState} from "react";
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
        <div>Concluindo o processo de autenticação. Por favor, aguarde.</div>
    )
}

export default OauthHandoff;