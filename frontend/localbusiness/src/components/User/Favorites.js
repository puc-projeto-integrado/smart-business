import React, {useEffect, useState} from "react";
import { read_cookie } from 'sfcookies';
import BusinessItem from "../Business/BusinessItem";
import Column from "../Column";

const Favorites = ()=>{

    const [favorites, setFavorites] = useState(null);
    const cookie = read_cookie('credentials');
    const userId = cookie.id;
    const accessToken = cookie.access_token;
    const url =  `http://localhost/public/api/favorites/${userId}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    useEffect(() => {
        if(!favorites) {
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => setFavorites(data.data))
                .catch(error => console.log('error', error));
        }
    }, [url, requestOptions, favorites]);

    const ShowFavorites = ()=>{
        let numItems = 0;

        if(favorites.length>0) {
            return (
                favorites.map((item) => {
                    numItems++;
                    return (numItems < 50) ?
                        <BusinessItem size="full" fromFavoritesPage={true} hideAddFavorites={true} data={item}
                                      key={numItems}/> : false;
                })
            )
        }else{
            return <div>Você ainda não tem favoritos cadastrados...</div>
        }
    }

    if(favorites){
        return (
            <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-8  pt-5">
                    <h2>Favoritos</h2>
                    <ShowFavorites />
                </div>
                <div className="col-4 d-none d-sm-block pt-5">
                    <Column />
                </div>
            </div>
            </div>
        )

    }else{
        return (
            <div className="container mt-5">
                <h2>Favorites</h2>
                <p>Loading...</p>
            </div>
        )
    }


}
export default Favorites;