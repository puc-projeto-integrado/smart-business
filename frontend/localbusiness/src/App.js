import React, {useContext, useState} from 'react'
import {BaseContext} from './components/ContextProviders/BaseContextProvider';
import {CommonFunctions} from "./components/Common";
import {delete_cookie} from "sfcookies";
import Header from './components/Header'
import Footer from './components/Footer'
import Routing from './components/Routing';

export default function App() {
    //console.log('ENV ', process.env.NODE_ENV)

    const [base] = useContext(BaseContext);
    const [mustRedirect, setMustRedirect] = useState(false);
    let isAuthenticated = CommonFunctions.isAuthenticated();
    let userBusiness = base.userBusiness;
    let categories = base.categories;
    let role = base.credentials.roleId;

    const logout = ()=>{
        delete_cookie('credentials')
        setMustRedirect('/');
    }

    const redirect = (url)=> {
        setMustRedirect(url);
    }

    const functionRefs = {
        "logout" : logout,
        "redirect" : redirect
    }

    return (
        <>
            <Header
                functionRefs={functionRefs}
                isAuthenticated={isAuthenticated}
                userBusiness={userBusiness}
                categories={categories}
                role={role}
            />
            <Routing userBusiness={userBusiness} functionRefs={functionRefs} mustRedirect={mustRedirect} />
            <Footer categories={categories} />
        </>
    )
}