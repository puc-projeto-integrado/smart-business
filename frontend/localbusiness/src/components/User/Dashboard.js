import React, {useContext, useEffect, useState} from "react";
import { BaseContext } from '../ContextProviders/BaseContextProvider';
import Loading from "../Loading";

const Dashboard = ()=>{

    const [base] = useContext(BaseContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [businessCanRegister, setBusinessCanRegister] = useState(false);

    useEffect(() => {
        if(base.credentials.roleId===1){
            setIsAdmin('true');
        }

        setBusinessCanRegister(base.userBusiness);
    }, [base.credentials.roleId, base.userBusiness]);

    if(base) {
        let statsPanel;
        let adminButtons;
        let businessAction;

        if(isAdmin){
            adminButtons = (
                <>
                    <div>
                        <a href="/admin/business" className="btn btn-secondary btn-block mt-3"><em className="fa fa-cogs"></em> GERENCIAR EMPRESAS</a>
                    </div>
                    <div>
                        <a href="/admin/stats" className="btn btn-secondary btn-block mt-3"><em className="fa fa-eye"></em> STATÍSTICAS</a>
                    </div>
                </>
            )
        }

        if (!businessCanRegister) {
            businessAction = <div><a href="/register" className="btn btn-secondary btn-block mt-3"><em className="fa fa-briefcase"></em> CADASTRAR EMPRESA</a></div>;
        }else{
            businessAction = <div><a href="/user/business" className="btn btn-secondary btn-block mt-3"><em className="fa fa-briefcase"></em> DADOS EMPRESA</a></div>;
        }

        statsPanel = (
            <>
                {adminButtons}
                <div>
                    <a href="/favorites" className="btn btn-secondary btn-block mt-3"><em className="fa fa-heart"></em> FAVORITOS</a>
                </div>
                <div>
                    <a href="/user/update" className="btn btn-secondary btn-block mt-3"><em className="fa fa-user"></em> MEUS DADOS</a>
                </div>
                {businessAction}
            </>);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-8 pt-5 offset-md-2">
                        <h2>Dashboard</h2>
                        {statsPanel}
                    </div>
                </div>
            </div>
        )
    }else{
        return <Loading/>
    }
}

export default Dashboard;