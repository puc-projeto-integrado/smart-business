import React from "react";

const Dashboard = (props)=>{
    console.log(props)
    const urlBusiness = `/business-detail/${props.userBusiness.id}`;
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-8 pt-5 offset-md-2">

                    <h2>Dashboard</h2>

                    <div>
                        <a href="/favorites" className="btn btn-primary btn-block mt-3">Favoritos</a>
                    </div>
                    <div>
                        {!props.userBusiness.id ? <a href="/register" className="btn btn-primary btn-block mt-3">Cadastre sua empresa</a> : <a href={urlBusiness} className="btn btn-primary btn-block mt-3">Ver Empresa</a>}

                    </div>


                </div>

            </div>
        </div>
    )
}

export default Dashboard;