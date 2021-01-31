import React, {useEffect, useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Routing from './components/Routing';
import {isAuthenticated} from './components/Utils';
import {delete_cookie, read_cookie} from "sfcookies";

const App = () => {

    const cookie = read_cookie('credentials');
    const userId = cookie.id;
    const accessToken = cookie.access_token;

    const [mustRedirect, setMustRedirect] = useState(false);
    const [userBusiness, setUserBusiness] = useState(false);

    const logout = ()=>{
        delete_cookie('credentials')
        setMustRedirect('/');
    }

    const redirect = (url)=> setMustRedirect(url);

    useEffect(() => {
        const urlHasBusiness = `http://localhost/public/api/business/user/${userId}`;
        if (!userBusiness) {

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${accessToken}`);
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var requestOptionsUserBusiness = {
                method: 'GET',
                headers: myHeaders,
            };

            fetch(urlHasBusiness, requestOptionsUserBusiness)
                .then(response => response.json())
                .then(data => setUserBusiness(data))
                .catch(error => console.log('error', error));
        }
    });

    const functionRefs = {
        "logout" : logout,
        "redirect" : redirect
    }

    return (
        <div>
            <Header functionRefs={functionRefs} isAuthenticated={isAuthenticated()} userBusiness={userBusiness}/>
            <Routing functionRefs={functionRefs} isAuthenticated={isAuthenticated()} mustRedirect={mustRedirect} userBusiness={userBusiness}/>
            <Footer />
        </div>
    )
}

export default App