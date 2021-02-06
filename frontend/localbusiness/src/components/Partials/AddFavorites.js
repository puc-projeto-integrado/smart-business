import React, {useContext} from "react";
import { BaseContext } from '../ContextProviders/BaseContextProvider';

const AddFavorites = (props)=>{
    
    const [base] = useContext(BaseContext);

    const addToFavoritesDo = ()=>{
        console.log("addToFavorites")

        const userId = base.credentials.userId;
        const businessId = props.businessId;
        const accessToken = base.credentials.accessToken;
        const url =  base.urls.favoritesAdd;

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
            .then(data => addFavoritesDoPost(data))
            .catch(error => console.log('error', error));
    }

    const addFavoritesDoPost = (data)=>{
        console.log(data);
        props.funcRefs(true);
    }

    return (
        <button onClick={addToFavoritesDo} className="btn btn-outline-primary btn-block"><span className="fas fa-heart"></span> Adicionar Favorito</button>
    )
}

export default AddFavorites;