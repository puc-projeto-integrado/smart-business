import React from 'react';

const Column = ()=>{
    return (
        <aside>
            <span className="gray-3">ANÚNCIO</span>
            <img src="/assets/images/anuncio.jpg" alt="Local Business"/>

            <ul className="column-submenu">
                <li><a href="http://localhost"><span className="fa fa-check"></span> IMPORTAÇÃO DE ROUPAS</a></li>
                <li><a href="http://localhost"><span className="fa fa-check"></span> GRÁFICAS EM SÃO PAULO</a></li>
                <li><a href="http://localhost"><span className="fa fa-check"></span> GRÁFICAS NO RIO DE JANEIRO</a></li>
                <li><a href="http://localhost"><span className="fa fa-check"></span> IMPRESSÃO DE PANFLETOS</a></li>
                <li><a href="http://localhost"><span className="fa fa-check"></span> CRIAÇÃO DE SITES</a></li>
                <li><a href="http://localhost"><span className="fa fa-check"></span> FORNECEDORES DE BRINDES</a></li>
                <li><a href="http://localhost"><span className="fa fa-check"></span> FORNECEDORES DE COMUNICAÇÃO</a></li>
                <li><a href="http://localhost"><span className="fa fa-check"></span> FORNECEDORES DE INFORMÁTICA</a></li>
            </ul>
        </aside>

    )
}
  
export default Column;