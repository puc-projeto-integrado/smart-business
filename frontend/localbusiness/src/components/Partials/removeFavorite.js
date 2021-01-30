import React from 'react';
import {read_cookie} from "sfcookies";

const RemoveFavorite = (props)=>{

    console.log(props)

    const removeFavorite = ()=>{
        console.log("removeFavorite...")

        const cookie = read_cookie('credentials');
        const userId = cookie.id;
        const businessId = props.businessId;
        const accessToken = cookie.access_token;
        const url =  `http://localhost/public/api/favorites/delete`;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        var urlencoded = new URLSearchParams();
        urlencoded.append("user_id", userId);
        urlencoded.append("business_id", businessId);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(props.funcRefs(false))
            .catch(error => console.log('error', error));

    }

    return <button href="#" onClick={removeFavorite} className="btn btn-danger favorito"><em className="fa fa-heart"></em> Remover Favorito </button>
}

export default RemoveFavorite;

