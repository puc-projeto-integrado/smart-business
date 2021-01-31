import React from "react";
import InputText from "../Partials/InputText";
import InputSelect from "../Partials/InputSelect";

const Dashboard = ()=>{
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-8 pt-5 offset-md-2">

                    <h2>Dashboard</h2>

                    <div>
                        <a href="/favorites" className="btn btn-primary btn-block mt-3">Favoritos</a>
                    </div>
                    <div>
                        <a href="/register" className="btn btn-primary btn-block mt-3">Cadastre sua empresa</a>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Dashboard;