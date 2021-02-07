import React, {useContext} from "react";
import { BaseContext } from '../ContextProviders/BaseContextProvider';

const Dashboard = ()=>{

    const [base] = useContext(BaseContext);

    if(base) {
        console.log(base.credentials)

        let urlBusiness = null;
        if(base.urlBusiness){
            urlBusiness = `/business/${base.userBusiness.id}`;
        }

        let statsPanel;
        if(base.credentials.roleId===1){
            statsPanel = (
                <div>
                    <a href="/favorites" className="btn btn-secondary btn-block mt-3"><em className="fa fa-eye"></em> STATÍSTICAS</a>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-8 pt-5 offset-md-2">
                        <h2>Dashboard</h2>

                        {statsPanel}

                        <div>
                            <a href="/favorites" className="btn btn-secondary btn-block mt-3"><em className="fa fa-heart"></em> FAVORITOS</a>
                        </div>
                        <div>
                            <a href="/user/update" className="btn btn-secondary btn-block mt-3"><em className="fa fa-user"></em> MEUS DADOS</a>
                        </div>
                        <div>
                            {!base.userBusiness ? <a href="/register" className="btn btn-secondary btn-block mt-3"><em className="fa fa-briefcase"></em> CADASTRAR EMPRESA</a> :
                                <a href={urlBusiness} className="btn btn-secondary btn-block mt-3"><em className="fa fa-briefcase"></em> DADOS EMPRESA</a>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;