import React, {useState, createContext, useEffect} from "react";
import {CommonUrls, CommonCredentials, CommonFunctions} from "../Common";
export const BaseContext = createContext([]);

export const BaseContextProvider = props => {

    const [favorites, setFavorites] = useState(null);
    const [userBusiness, setUserBusiness] = useState(null);
    const [categories, setCategories] = useState(null);
    const [initData, setInitData] = useState({
        favorites : null,
        userBusiness : null,
        categories : null
    });
    const [urls] = useState(CommonUrls);

    let tmpInitData = initData;

    if(initData.userBusiness && urls){
        urls.businessUserDetail = `/business/${initData.userBusiness.id}`;
    }else{
        urls.businessUserDetail = null;
    }

    useEffect(() => {

        if(CommonCredentials.userId && urls){
            let favoritesHeaders = new Headers();
            favoritesHeaders.append("Authorization", `Bearer ${CommonCredentials.accessToken}`);

            let requestOptions = {
                method: 'GET',
                headers: favoritesHeaders
            };

            fetch(urls.favorites, requestOptions)
                .then(response => response.json())
                // .then(response => setTempFavorites(response.data))
                .then(response => setFavorites(response.data))
                .catch(error => console.log('error', error));
        }

        if (!userBusiness && CommonCredentials.accessToken) {
            let businessHeaders = new Headers();
            businessHeaders.append("Authorization", `Bearer ${CommonCredentials.accessToken}`);
            businessHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            let requestOptionsUserBusiness = {
                method: 'GET',
                headers: businessHeaders,
            };

            fetch(urls.businessByUser, requestOptionsUserBusiness)
                .then(response => response.status!==200 ? null : response.json())
                // .then(data => setTempUserBusiness(data))
                .then(data => setUserBusiness(data))
                .catch(error => console.log('error', error));
        }

        if(!categories) {
            fetch(urls.category)
                .then(response => response.json())
                // .then(data => setTempCategories(CommonFunctions.sortAlphabetically(data)))
                .then(data => setCategories(CommonFunctions.sortAlphabetically(data)))
                .catch(error => console.log('error', error));
        }

    }, []);

    if(tmpInitData.favorites && tmpInitData.categories && tmpInitData.userBusiness){
        setInitData(tmpInitData)
    }
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

    let obj = {
        urls : urls,
        credentials : CommonCredentials,
        favorites : favorites,
        userBusiness : userBusiness,
        categories : categories,
        // isAuthenticated : isAuthenticated,
        isFavorite : queryIsFavorite
    }

    let setObj = {};

    return (
        <BaseContext.Provider value={[obj, setObj]}>
            {props.children}
        </BaseContext.Provider>
    );
};