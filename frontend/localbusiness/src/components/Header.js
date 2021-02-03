import React, {useContext} from 'react';
import {read_cookie} from "sfcookies";
import { BaseContext } from './ContextProviders/BaseContextProvider';

const Header = () => {

    const [base] = useContext(BaseContext);
    let isAuthenticated = base.isAuthenticated();
    let name = null;

    if(isAuthenticated){
        const credentials = read_cookie('credentials');
        name = credentials.name;
    }

    const max = 6;
    let count = 0;

    if(base) {
        console.log('urls ', base.urls.businessUserDetail)
        return (
            <div>
                <div className="header">
                    <div className="container">
                        <a href="/" className="logo"><img src="/assets/images/logo.png" alt="Local Business"/></a>
                        {isAuthenticated ? <div className="user-info-bar"><strong>Olá, {name}.</strong> Caso não seja {name}, <a href="/logout">clique aqui</a>.</div> : ''}
                        <div className="header-right">
                            {!base.urls.businessUserDetail ? <a href="/register">CADASTRE SUA EMPRESA</a> : <a href={base.urls.businessUserDetail}>DADOS DA EMPRESA</a>}
                            {isAuthenticated ? (<a className="" href="/favorites"><span className="fa fa-heart red"></span> FAVORITOS</a>) : ''}
                            {!isAuthenticated ? (<a className="active" href="/login"><span className="fa fa-key"></span> LOGIN</a>) : (<a href="/logout" className="logout">LOGOUT</a>)}
                        </div>
                    </div>
                </div>

                <div className="submenu">
                    <div className="container">
                        <ul>
                            {base.categories ? base.categories.map((item) => {
                                count++;
                                let urlCategory = `/category/${item.id}`;
                                return (count < max) ? <li key={item.id}><a href={urlCategory}>{item.name}</a></li> : ''
                            }) : 'Carregando categorias...'}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }else{
        return null;
    }
}
  
export default Header;