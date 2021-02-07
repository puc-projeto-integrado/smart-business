import React, {useContext} from "react";
import { BaseContext } from '../ContextProviders/BaseContextProvider';
import {ModalContext} from "../ContextProviders/ModalContextProvider";

const AddFavorites = (props)=>{
    
    const [base] = useContext(BaseContext);
    const [modal, setModal] = useContext(ModalContext);

    const addToFavoritesDo = ()=>{
        console.log("addToFavorites")
        if(base.credentials.userId){
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
                .then(response => response.json())
                .then(data => addFavoritesDoPost(data))
                .catch(error => console.log('error', error));
        }else{
            console.log('Must be logged in...')
            console.log(base)
            setModal(true);
        }

    }

    const addFavoritesDoPost = (data)=>{
        console.log(base.userBusiness);
        console.log(data)
        if(data.status==='saved') {
            console.log('done...')
            props.funcRefs.setIsFavorite(true);
        }
    }

    return (
        <button onClick={addToFavoritesDo} className="btn btn-outline-primary btn-block"><span className="fas fa-heart"></span> Adicionar Favorito</button>
    )
}

export default AddFavorites;