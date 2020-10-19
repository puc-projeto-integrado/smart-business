import React from 'react';

const Header = () => {
    return (
      <div>
        <div className="header">
          <div className="container">
              <a href="#default" className="logo"><img src="/assets/images/logo.png" alt="Local Business"/></a>
              <div className="header-right">
                  <a className="hiddenWhenMobile" href="#home">HOME</a>
                  <a className="" href="#contact">CADASTRE SUA EMPRESA</a>
                  <a className="active" href="#contact"><span className="fa fa-key"></span> LOGIN</a>
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