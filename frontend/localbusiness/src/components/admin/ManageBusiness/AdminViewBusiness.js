import React, {useState, useContext, useEffect} from "react";
import { BaseContext } from '../../ContextProviders/BaseContextProvider';
import Loading from "../../Loading";
import {useParams} from "react-router";

const AdminViewBusiness = ()=>{

    const [base] = useContext(BaseContext);
    const [viewData, setViewData] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${base.urls.businessDetail}/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => setInitialFormState(data))
            .catch(error => console.log('error', error));
    }, [base.urls.businessDetail]);

    const setInitialFormState = (data)=>{
        let obj = {};
        data.forEach((item)=>{

            Object.keys(item).forEach((key)=>{
                console.log('key', key)
                console.log(item[key])
                obj[key]=item[key]
            })
        });
        setViewData(obj)
    }

    let output;
    let urlEdit = `/admin/business/update/${id}`;

    const getNiceName = (key)=>{
        let names = {
            id : 'ID', name : 'Nome', email : 'Email', cnpj : 'CNPJ', website : 'Website',
            description : 'Descrição', address : 'Endereço', district : 'Bairro', category_name : 'Categoria',
            city_name : 'Cidade', phone : 'Telefone'
        };
        return names[key];
    }

    if(viewData) {
        let objToArray = Object.keys(viewData);

        let rows = objToArray.map((key)=>{
            if(getNiceName(key)){
                return (
                    <div className="mb-3">
                        <label htmlFor="name"><strong>{getNiceName(key)}:</strong></label><br/>
                        {viewData[key]}
                    </div>
                )
            }
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