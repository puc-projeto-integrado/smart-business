import React, {useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Routing from './components/Routing';
import {isAuthenticated} from './components/Utils';
import {delete_cookie} from "sfcookies";

const App = () => {

    const [mustRedirect, setMustRedirect] = useState(false);

    const logout = ()=>{
        delete_cookie('credentials')
        setMustRedirect('/');
    }

    const redirect = (url)=> setMustRedirect(url);

    const functionRefs = {
        "logout" : logout,
        "redirect" : redirect
    }

    return (
        <div>
            <Header functionRefs={functionRefs} isAuthenticated={isAuthenticated()}/>
            <Routing functionRefs={functionRefs} isAuthenticated={isAuthenticated()} mustRedirect={mustRedirect}/>
            <Footer />
        </div>
    )
}

export default App