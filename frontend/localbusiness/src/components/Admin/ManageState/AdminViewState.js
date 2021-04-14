import React, {useState, useContext} from "react";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import {CommonUrls, CommonCredentials} from "../../Common";
import Loading from "../../Loading";
import RowView from "../../Partials/RowView";
import {useParams} from "react-router";
import useGetEntity from "../../Hooks/useGetEntity";

const AdminViewState = ()=>{

    const [utils] = useContext(UtilsContext);
    const [viewData, setViewData] = useState(null);
    const {id} = useParams();
    const labels = { uf: 'Uf', name: 'Nome'};
    const urlEdit = `/admin/state/update/${id}`;
    const deps = {
        bearerToken : CommonCredentials.accessToken,
        url : `${CommonUrls.uf}/${id}`,
        setInitialFormState : utils.setInitialFormState,
        setInitData : setViewData,
    }
    let output = <Loading/>;

    useGetEntity(deps);

    if(viewData) {
        let rows = Object.keys(viewData).map((key)=> (labels[key]) ? <RowView key={key} value={viewData[key]} name={labels[key]} /> : '');

        output = (
            <>
                {rows}
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

export default AdminViewState;