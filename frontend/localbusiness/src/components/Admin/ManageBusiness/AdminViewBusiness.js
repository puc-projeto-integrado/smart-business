import {CommonUrls, CommonCredentials} from "../../Common";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import React, {useState, useContext} from "react";
import Loading from "../../Loading";
import RowView from "../../Partials/RowView";
import useGetEntity from "../../Hooks/useGetEntity";
import {useParams} from "react-router";

const AdminViewBusiness = ()=>{
    const [utils] = useContext(UtilsContext);
    const [viewData, setViewData] = useState(null);
    const {id} = useParams();
    const urlEdit = `/admin/business/update/${id}`;
    const labels = {
        id: 'ID', name: 'Nome', email: 'Email', cnpj: 'CNPJ', website: 'Website',
        description: 'Descrição', address: 'Endereço', district: 'Bairro', category_name: 'Categoria',
        city_name: 'Cidade', phone: 'Telefone'
    };
    const deps = {
        bearerToken : CommonCredentials.accessToken,
        url : `${CommonUrls.businessDetail}/${id}`,
        setInitialFormState : utils.setInitialFormState,
        setInitData : setViewData,
    }
    let output = <Loading/>;

    useGetEntity(deps)

    if(viewData) {
        let rows = Object.keys(viewData).map((key)=>{
            return labels[key] ? <RowView key={key} value={viewData[key]} name={labels[key]} /> : '';
        })

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

export default AdminViewBusiness;