import React, {useState} from 'react'
import {BaseContextProvider} from './components/ContextProviders/BaseContextProvider';
import {delete_cookie} from "sfcookies";
import Header from './components/Header'
import Footer from './components/Footer'
import Routing from './components/Routing';

export default function App() {

    const [mustRedirect, setMustRedirect] = useState(false);

    console.log('ENV ', process.env.NODE_ENV)

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
        <BaseContextProvider>
            <Header functionRefs={functionRefs}/>
            <Routing functionRefs={functionRefs} mustRedirect={mustRedirect} />
            <Footer />
        </BaseContextProvider>
    )
}