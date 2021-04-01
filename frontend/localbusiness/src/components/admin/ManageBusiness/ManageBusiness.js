import React, {useContext, useEffect, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import Loading from "../../Loading";
import TableActions from "../../Partials/TableActions";

const ManageBusiness = ()=>{

    const [base] = useContext(BaseContext);
    const [business, setBusiness] = useState(null);

    useEffect(() => {
        fetch(base.urls.business)
            .then(response => response.json())
            .then(data => setBusiness(data))
    }, [base.urls.business]);

    const businessDelete = (id)=>{
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);
        let urlencoded = new URLSearchParams();
        urlencoded.append("id", id);

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded
        };
        fetch(base.urls.userDelete, requestOptions)
            .then(response => response.json())
            .then(response => console.log('RESPONSE', response))
            // .then(data => console.log(data))
            .catch(error => console.log('error', error));
    }

    if(business) {
        // console.log(business)
        let rows = business.data.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.city_name}</td>
                    <td>{item.category_name}</td>
                    <TableActions
                        id={item.id}
                        view="/admin/business/"
                        edit="/admin/business/update/"
                        delete="#" />
                </tr>
            )
        })


        return (
            <main className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-12  pt-5">
                        <h2>Gerenciar Empresas</h2>
                        <div className="table-responsive">
                        <table className="table mt-5">
                            <thead>
                            <tr>
                                <td width="50%">EMPRESA</td>
                                <td width="20%">CIDADE</td>
                                <td width="15%">CATEGORIA</td>
                                <td width="15%">AÇÕES</td>
                            </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </main>
        )

    }else{
        return (
            <main className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-12  pt-5">
                        <h2>Gerenciar Empresas</h2>
                        <Loading/>
                    </div>
                </div>
            </main>)
    }
}

export default ManageBusiness;