import React from "react";
import BusinessItem from "./Business/BusinessItem";
import Column from "./Column";

const BusinessRegister = ()=>{

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-8  pt-5">
                    <h2>Cadastre sua empresa</h2>

                </div>
                <div className="col-4 d-none d-sm-block pt-5">
                    <Column />
                </div>
            </div>
        </div>
    )
}

export default BusinessRegister;