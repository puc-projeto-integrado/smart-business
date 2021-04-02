import React, {useState, useContext} from "react";
import {BaseContext} from '../../ContextProviders/BaseContextProvider';
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import Loading from "../../Loading";
import {useParams} from "react-router";
import RowView from "../../Partials/RowView";
import useGetEntity from "../../hooks/useGetEntity";

const AdminViewBusiness = ()=>{

    const [base] = useContext(BaseContext);
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
        bearerToken : base.credentials.accessToken,
        url : `${base.urls.businessDetail}/${id}`,
        setInitialFormState : utils.setInitialFormState,
        setInitData : setViewData,
    }
    let output;

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
    }else{
        output = <Loading/>
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