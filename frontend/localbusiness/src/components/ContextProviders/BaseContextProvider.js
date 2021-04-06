import React, {useState, createContext, useEffect} from "react";
import {read_cookie} from "sfcookies";
import {CommonUrls, CommonCredentials} from "../Common";
export const BaseContext = createContext();

export const BaseContextProvider = props => {

    const cookie = read_cookie('credentials');
    const [favorites, setFavorites] = useState(null);
    const [userBusiness, setUserBusiness] = useState(null);
    const [categories, setCategories] = useState(null);

    const [credentials] = useState(CommonCredentials);

    const [urls] = useState(CommonUrls);

    if(userBusiness && urls){
        urls.businessUserDetail = `/business/${userBusiness.id}`;
    }else{
        urls.businessUserDetail = null;
    }

    useEffect(() => {

        if(credentials.userId && urls){
            let favoritesHeaders = new Headers();
            favoritesHeaders.append("Authorization", `Bearer ${credentials.accessToken}`);

            let requestOptions = {
                method: 'GET',
                headers: favoritesHeaders
            };

            fetch(urls.favorites, requestOptions)
                .then(response => response.json())
                .then(response =>setFavorites(response.data))
                .catch(error => console.log('error', error));
        }

        if (!userBusiness && credentials.accessToken) {
            let businessHeaders = new Headers();
            businessHeaders.append("Authorization", `Bearer ${credentials.accessToken}`);
            businessHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            let requestOptionsUserBusiness = {
                method: 'GET',
                headers: businessHeaders,
            };

            fetch(urls.businessByUser, requestOptionsUserBusiness)
                // .then(response => console.log('RESP ', response.status))
                .then(response => response.status!==200 ? null : response.json())
                .then(data => setUserBusiness(data))
                .catch(error => console.log('error', error));
        }

        if(!categories) {
            fetch(urls.category)
                .then(response => response.json())
                .then(data => setCategories(data))
                .catch(error => console.log('error', error));
        }

    }, [credentials, urls, categories, userBusiness]);

    const queryIsFavorite = (id)=>{
        let isFavorite = false;
        if(favorites){
            favorites.forEach((itemFavorite) => {
                if (itemFavorite.id === id)
                    isFavorite = true;
            });
            return isFavorite;
        }
    }

    const isAuthenticated = () => {
        return (typeof cookie === 'undefined' || cookie.length === 0) ? false : true;
    };

    const sortAlphabetically = (array)=> {
        array.sort(function (a, b) {
            if (a.name < b.name) { return -1;}
            if (a.name > b.name) { return 1;}
            return 0;
        })
        return array;
    }

    let obj = {
        urls : urls,
        credentials : credentials,
        favorites : favorites,
        userBusiness : userBusiness,
        categories : categories,
        sortAlphabetically : sortAlphabetically,
        isAuthenticated : isAuthenticated,
        isFavorite : queryIsFavorite
    }

    let setObj = {};

    return (
        <BaseContext.Provider value={[obj, setObj]}>
            {props.children}
        </BaseContext.Provider>
    );
};