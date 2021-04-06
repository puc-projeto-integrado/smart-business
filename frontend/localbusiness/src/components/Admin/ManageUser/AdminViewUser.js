import React, {useState, useContext, useEffect} from "react";
import { BaseContext } from '../../ContextProviders/BaseContextProvider';
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import {CommonUrls, CommonCredentials} from "../../Common";
import Loading from "../../Loading";
import RowView from "../../Partials/RowView";
import {useParams} from "react-router";
import useGetEntity from "../../Hooks/useGetEntity";

const AdminViewUser = ()=>{

    const [base] = useContext(BaseContext);
    const [utils] = useContext(UtilsContext);
    const [viewData, setViewData] = useState(null);
    const {id} = useParams();
    const labels = { name : 'Nome', email : 'Email' };
    const urlEdit = `/admin/user/update/${id}`;
    const deps = {
        bearerToken : CommonCredentials.accessToken,
        url : `${CommonUrls.userDetail}/${id}`,
        setInitialFormState : utils.setInitialFormState,
        setInitData : setViewData,
    }
    let output = <Loading/>;

    useGetEntity(deps);

    if(viewData) {
        let rows = Object.keys(viewData).map((key)=>{
            return labels[key] ? <RowView key={key} value={viewData[key]} name={labels[key]} /> : '';
        })

        output = (
            <>
                {rows}
                <RowView value="********" name="Password" />
                <a href={urlEdit} className="btn btn-primary btn-block mt-3">EDITAR</a>
            </>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-5">Ver Dados</h2>
                    {output}
                </div>
            </div>
        </div>
    )
}

export default AdminViewUser;