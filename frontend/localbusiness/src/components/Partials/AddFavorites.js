import React from "react";
import {read_cookie} from "sfcookies";

const AddFavorites = (props)=>{

    const addToFavorites = ()=>{
        console.log("addToFavorites")

        const cookie = read_cookie('credentials');
        const userId = cookie.id;
        const businessId = props.businessId;
        const accessToken = cookie.access_token;
        const url =  `http://localhost/public/api/favorites/add`;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        var urlencoded = new URLSearchParams();
        urlencoded.append("user_id", userId);
        urlencoded.append("business_id", businessId);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(props.funcRefs(true))
            .catch(error => console.log('error', error));

    }

    return (
        <button onClick={addToFavorites} className="btn btn-outline-primary btn-block"><span className="fas fa-heart"></span> Adicionar Favorito</button>
    )
}

export default AddFavorites;