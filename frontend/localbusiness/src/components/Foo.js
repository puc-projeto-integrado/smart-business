import React, {useEffect, useState} from "react";
import Loading from "./Loading";
import {read_cookie} from "sfcookies";
const cookie = read_cookie('credentials');

const Foo = ()=>{
    console.log('ManageBusiness>>')

    return (
        <main className="container">
            <div className="row">
                <div className="col-sm-12 col-md-12  pt-5">
                    <h2>Gerenciar Empresas</h2>
                    <div>Faaa</div>
                </div>
            </div>
        </main>)
}

export default Foo;