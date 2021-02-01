import React, {useState, createContext, useEffect} from "react";
import {read_cookie} from "sfcookies";

export const BaseContext = createContext();

export const BaseContextProvider = props => {

    const cookie = read_cookie('credentials');
    const baseUrl = 'http://localhost/public';
    const [favorites, setFavorites] = useState(null);
    const [userBusiness, setUserBusiness] = useState(null);
    const [categories, setCategories] = useState(null);

    const [credentials, setCredentials] = useState({
        userId : cookie.id,
        accessToken : cookie.access_token
    });

    let businessUserDetail = null;
    if(userBusiness){
        businessUserDetail = `${baseUrl}/api/business/${userBusiness.id}`;
    }

    const [urls, setUrls] = useState({
        business: `${baseUrl}/api/business`,
        category: `${baseUrl}/api/category`,
        favorites: `${baseUrl}/api/favorites/${credentials.userId}`,
        businessByUser: `${baseUrl}/api/business/user/${credentials.userId}`,
        businessDetail: businessUserDetail,
        businessCategory: `${baseUrl}/api/business/category`,
    });

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

        if (!userBusiness) {
            let businessHeaders = new Headers();
            businessHeaders.append("Authorization", `Bearer ${credentials.accessToken}`);
            businessHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            let requestOptionsUserBusiness = {
                method: 'GET',
                headers: businessHeaders,
            };

            fetch(urls.businessByUser, requestOptionsUserBusiness)
                .then(response => response.status!==200 ? setUserBusiness(null) : response.json())
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
        if(typeof cookie === 'undefined' || cookie.length === 0){
            return false;
        }
        return true;
    };

    let obj = {
        urls : urls,
        credentials : credentials,
        favorites : favorites,
        userBusiness : userBusiness,
        categories : categories,
        isAuthenticated : isAuthenticated,
        isFavorite : queryIsFavorite
    }

    let setObj = {
        setUrls : setUrls,
        setCredentials : setCredentials,
        setFavorites : setFavorites,
    }

    return (
        <BaseContext.Provider value={[obj, setObj]}>
            {props.children}
        </BaseContext.Provider>
    );
};