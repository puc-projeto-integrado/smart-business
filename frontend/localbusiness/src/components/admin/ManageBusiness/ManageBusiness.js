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
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);
        let urlencoded = new URLSearchParams();
        urlencoded.append("id", id);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded
        };
        fetch(base.urls.userDelete, requestOptions)
            // .then(response => response.json())
            .then(response => console.log('RESPONSE', response))
            // .then(data => console.log(data))
            .catch(error => console.log('error', error));
    }

    if(business) {
        console.log(business)
        let rows = business.data.map((item) => {
            return (
                <tr key={item.id}>
                    <td width="50%">{item.name}</td>
                    <td width="20%">{item.city_name}</td>
                    <td width="20%">{item.category_name}</td>
                    <TableActions
                        id={item.id}
                        view="/admin/business/"
                        edit="/admin/business/update/"
                        delete={businessDelete}/>
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
                                <td>EMPRESA</td>
                                <td>CIDADE</td>
                                <td>CATEGORIA</td>
                                <td>AÇÕES</td>
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
        return <Loading/>
    }
}

export default ManageBusiness;