import React from 'react';
import {read_cookie} from "sfcookies";

const Header = (props) => {

    let name = null;

    if(props.isAuthenticated){
        const credentials = read_cookie('credentials');
        name = credentials.name;
    }

    const max = 6;
    let count = 0;
    let menu;
    let menuAdmin;

    if(props.role===1){
        menuAdmin = (
            <div className="menu-admin">
                <div className="container">
                    <ul>
                        <li><em className="fa fa-cogs"></em> <b>Gerencie:</b> </li>
                        <li><a href="/admin/user">Usuários</a></li>
                        <li><a href="/admin/category">Categorias</a></li>
                        <li><a href="/admin/state">Estados</a></li>
                        <li><a href="/admin/city">Cidades</a></li>
                        <li><a href="/admin/business">Empresas</a></li>
                        <li><a href="/admin/review">Reviews</a></li>
                    </ul>
                </div>
            </div>
        )
    }

    if(props.isAuthenticated){
        menu = (
            <div>
                <div className="user-info-bar"><strong>Olá, {name}.</strong><br/>Caso não seja {name}, <a href="/logout" className="no-float">clique aqui</a>.</div>
                <div className="header-right">
                    <a className="" href="/dashboard"><span className="fa fa-cog gray-4"></span> DASHBOARD</a>
                    <a className="" href="/logout"><span className="fa fa-power-off gray-4"></span> LOGOUT</a>
                </div>
            </div>
        )

    }else{
        menu = (
            <div>
                <div className="header-right">
                    {props.userBusiness == null ? <a href="/register"><span className="fa fa-briefcase gray-4"></span> CADASTRAR EMPRESA</a> : <a href="/user/business">DADOS DA EMPRESA</a>}
                    <a className="active" href="/login"><span className="fa fa-key"></span> LOGIN</a>
                </div>
            </div>
        )
    }

    return (

        <div>
            <div className="header">
                <div className="container">
                    <a href="/" className="logo"><img src="/assets/images/logo.png" alt="Local Business"/></a>
                    {menu}
                </div>
            </div>

            <div className="submenu">
                <div className="container">
                    <ul>
                        {props.categories ? props.categories.map((item) => {
                            count++;
                            let urlCategory = `/category/${item.id}`;
                            return (count < max) ?
                                <li key={item.id}><a href={urlCategory}>{item.name}</a></li> : ''
                        }) : "Carregando..."}
                    </ul>
                </div>
            </div>
            <div>{menuAdmin}</div>
        </div>
    )
}
  
export default Header;