import React, {useContext} from "react";
import { BaseContext } from '../ContextProviders/BaseContextProvider';

const Dashboard = ()=>{

    const [base] = useContext(BaseContext);

    if(base) {

        let urlBusiness = null;
        if(base.urlBusiness){
            urlBusiness = `/business/${base.userBusiness.id}`;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-8 pt-5 offset-md-2">
                        <h2>Dashboard</h2>
                        <div>
                            <a href="/favorites" className="btn btn-primary btn-block mt-3">Favoritos</a>
                        </div>
                        <div>
                            {!base.userBusiness ? <a href="/register" className="btn btn-primary btn-block mt-3">Cadastre sua empresa</a> :
                                <a href={urlBusiness} className="btn btn-primary btn-block mt-3">Ver Empresa</a>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;