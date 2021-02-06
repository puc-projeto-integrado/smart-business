import React, {useContext} from 'react';
import {BaseContext} from "../ContextProviders/BaseContextProvider";

const RemoveFavorite = (props)=>{

    const [base] = useContext(BaseContext);

    const removeFavorite = ()=>{

        if(base){
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);

            let urlencoded = new URLSearchParams();
            urlencoded.append("user_id", base.credentials.userId);
            urlencoded.append("business_id", props.businessId);

            let requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch(base.urls.favoritesDelete, requestOptions)
                .then(response => response.json())
                .then(data => setMyStates(data))
                .catch(error => console.log('error', error));
        }

    }

    const setMyStates = (data)=>{
        props.funcRefs(false);
    }

    return <button href="#" onClick={removeFavorite} className="btn btn-danger favorito"><em className="fa fa-heart"></em> Remover Favorito </button>
}

export default RemoveFavorite;

