import React, {useContext, useEffect, useState} from "react";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import {CommonUrls, CommonCredentials} from "../../Common";
import {useParams} from "react-router";
import Feedback from "../../Partials/Feedback";
import Loading from "../../Loading";

const AdminAddBusiness = ()=>{
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    let output = <Loading/>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-5">Nova Empresa</h2>
                    <p>Somente um usuário válido pode registrar uma empresa em seu nome.</p>
                </div>
            </div>
        </div>
    )
}

export default AdminAddBusiness;