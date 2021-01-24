import React, {useEffect, useState} from 'react';
import {read_cookie, delete_cookie} from "sfcookies";
import { BrowserRouter as Redirect } from 'react-router-dom';

const Header = () => {

    const [mustRedirect, setMustRedirect] = useState(false);
    const cookie = read_cookie('credentials');
    let name = cookie ? cookie.name : '';

    const logout = ()=>{
        console.log('Loggin out')
        delete_cookie('credentials')
            setMustRedirect(true);
            console.log('deleted...')
            console.log(cookie)

    }

    if(mustRedirect){
        console.log('Must redirect...')
        return <Redirect to="/login"/>
    }

    return (
      <div>
        <div className="header">
          <div className="container">
              <a href="#default" className="logo"><img src="/assets/images/logo.png" alt="Local Business"/></a>
              {cookie ? <div className="user-info-bar"><strong>Olá, {name}.</strong> Caso não seja {name}, <a href="#">clique aqui</a>.</div> : ''}
              <div className="header-right">

                  <a className="hiddenWhenMobile" href="#home">HOME</a>
                  <a className="" href="#contact">CADASTRE SUA EMPRESA</a>
                  {!cookie ? (<a className="active" href="/login"><span className="fa fa-key"></span> LOGIN</a>) : (<a className="logout" onClick={logout}>LOGOUT</a>)}

              </div>
          </div>
        </div>
  
        <div className="submenu">
            <div className="container">
                <ul>
                    <li><a href="http://localhost">Brindes</a></li>
                    <li><a href="http://localhost">Comunicação</a></li>
                    <li><a href="http://localhost">Saúde</a></li>
                    <li><a href="http://localhost">Webdesign</a></li>
                    <li><a href="http://localhost">Gráficas</a></li>
                    <li><a href="http://localhost">Vestuário</a></li>
                    <li><a href="http://localhost">Alimentação</a></li>
                    <li><a href="http://localhost">Fotografia</a></li>
                    <li><a href="http://localhost">Tecnologia</a></li>
                </ul>
            </div>
        </div>
      </div>
    )
}
  
export default Header;