import React, {useState} from 'react';
import {read_cookie} from "sfcookies";

const Header = (props) => {

    let isAuthenticated = props.isAuthenticated;
    let name = null;
    const [userHasBusiness, setUserHasBusiness] = useState()

    if(isAuthenticated){
        const credentials = read_cookie('credentials');
        name = credentials.name;
    }

    //setUserHasBusiness(!!props.userBusiness.id);
    const urlBusiness = `/business-detail/${props.userBusiness.id}`;

    return (
      <div>
        <div className="header">
          <div className="container">
              <a href="/" className="logo"><img src="/assets/images/logo.png" alt="Local Business"/></a>
              {isAuthenticated ? <div className="user-info-bar"><strong>Olá, {name}.</strong> Caso não seja {name}, <a href="/logout">clique aqui</a>.</div> : ''}
              <div className="header-right">
                  {!props.userBusiness.id ? <a className="" href="/register">CADASTRE SUA EMPRESA</a> : <a className="" href={urlBusiness}>DADOS DA EMPRESA</a>}
                  {isAuthenticated ? (<a className="" href="/favorites"><span className="fa fa-heart red"></span> FAVORITOS</a>) : ''}
                  {!isAuthenticated ? (<a className="active" href="/login"><span className="fa fa-key"></span> LOGIN</a>) : (<a href="/logout" className="logout">LOGOUT</a>)}
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