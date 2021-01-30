import React, {useEffect, useState} from 'react';
import Column from './../Column';
import HomeHighlights from './HomeHighlights';
import HomeBusiness from './HomeBusiness';
import {read_cookie} from "sfcookies";

const Home = () => {

    const [favorites, setFavorites] = useState(null);
    const cookie = read_cookie('credentials');
    const userId = cookie.id;

    useEffect(() => {

        if(userId){

            const accessToken = cookie.access_token;
            const url =  `http://localhost/public/api/favorites/${userId}`;

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${accessToken}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders
            };

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(response =>setFavorites(response.data))
                .catch(error => console.log('error', error));
        }

    }, [cookie.access_token, userId]);

    const queryIsFavorite = (id)=>{
        let isFavorite = false;
        if(favorites){
            favorites.forEach((itemFavorite) => {
                if (itemFavorite.id === id) {
                    isFavorite = true;
                }
            });
            return isFavorite;
        }
    }

    return (
        <main className="container">
            <div className="row">
                <div className="col-sm-12 col-md-8  pt-5">
                    <HomeHighlights queryIsFavorite={queryIsFavorite} favoritesData={favorites}/>
                </div>
                <div className="col-4 d-none d-sm-block pt-5">
                    <Column />
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h3 className="mt-5">Mais Recentes</h3>
                    <HomeBusiness queryIsFavorite={queryIsFavorite} favoritesData={favorites} />
                </div>
            </div>
        </main>
    );
}

export default Home;