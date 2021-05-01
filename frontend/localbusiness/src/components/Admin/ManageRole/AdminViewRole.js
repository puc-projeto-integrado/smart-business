import React, {useState, useContext, useEffect} from "react";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import {CommonUrls, CommonCredentials} from "../../Common";
import Loading from "../../Loading";
import RowView from "../../Partials/RowView";
import {useParams} from "react-router";

const AdminViewRole = ()=>{

    const [utils] = useContext(UtilsContext);
    const [viewData, setViewData] = useState(null);
    const [roleActions, setRoleActions] = useState(null);
    const {id} = useParams();
    const labels = { name : 'Nome'};
    const urlEdit = `#`;
    let output = <Loading/>;

    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${CommonCredentials.accessToken}`);
        let requestOptions = { method: 'GET', headers: myHeaders};

        const deps = {
            bearerToken : CommonCredentials.accessToken,
            url : `${CommonUrls.role}/${id}`,
            setInitialFormState : utils.setInitialFormState,
            setInitData : setViewData,
        }

        fetch(deps.url, requestOptions)
            .then(response => response.json())
            .then(data => deps.setInitialFormState(data, deps.setInitData))
            .catch(error => console.log('error', error));

        fetch(`${CommonUrls.roleActionsByRoleId}/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => setRoleActions(data))
            .catch(error => console.log('error', error));
    }, []);

    if(viewData && roleActions) {
        let rows = Object.keys(viewData).map((key)=>{
            return labels[key] ? <RowView key={key} value={viewData[key]} name={labels[key]} /> : '';
        });

        let rowsRoleActions = roleActions.map((item)=>{
            return (
                <div className="mt-3">
                    <div><em className="fa fa-check"></em> {item.name}</div>
                    <div className="badge badge-primary">Path: {item.route}</div>
                </div>
            )
        });

        output = (
            <>
                {rows}
                <h5>Permissões:</h5>
                <div>{rowsRoleActions}</div>
                <a href={urlEdit} className="btn btn-primary btn-block mt-3">EDITAR</a>
            </>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-5">Ver Perfil de Acesso</h2>
                    {output}
                </div>
            </div>
        </div>
    )
}

export default AdminViewRole;