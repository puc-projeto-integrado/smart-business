import React, {useContext, useEffect, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import Loading from "../../Loading";

const ManageBusiness = ()=>{

    const [base] = useContext(BaseContext);
    const [business, setBusiness] = useState(null);

    useEffect(() => {
        fetch(base.urls.business)
            .then(response => response.json())
            .then(data => setBusiness(data))
    }, [base.urls.business]);

    if(business) {
        console.log(business)
        let rows = business.data.map((item) => {
            return (
                <tr key={item.id}>
                    <td width="50%">{item.name}</td>
                    <td width="20%">{item.city_name}</td>
                    <td width="20%">{item.category_name}</td>
                    <td width="10%">
                        <em className="fa fa-eye ml-2"></em>
                        <em className="fa fa-edit ml-2"></em>
                        <em className="fa fa-trash ml-2"></em>
                    </td>
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