import React, {useContext, useEffect, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import Loading from "../../Loading";
import TableActions from "../../Partials/TableActions";

const ManageCategory = ()=>{

    const [base] = useContext(BaseContext);
    const [utils] = useContext(UtilsContext);
    const [category, setCategory] = useState(null);
    const bearerToken = base.credentials.accessToken;

    useEffect(() => {
        fetch(base.urls.category)
            .then(response => response.json())
            .then(data => setCategory(data))
    }, [base.urls.category]);

    const processItemDelete = (response)=>{
        console.log("processItemDelete ", response)
    }

    if(category) {
        console.log(category)
        let rows = category.map((item) => {
            return (
                <tr key={item.id}>
                    <td width="80%">{item.name}</td>
                    <TableActions
                        id={item.id}
                        view="/admin/business/"
                        edit="/admin/business/update/"
                        itemDeleteCallback={utils.itemDelete}
                        processItemDeleteCallback={processItemDelete}
                        urlItemDelete={base.urls.category}
                        bearerToken={bearerToken}
                    />
                </tr>
            )
        })

        return (
            <main className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-12 pt-5">
                        <h2>Gerenciar Empresas</h2>
                        <div className="table-responsive">
                            <table className="table mt-5">
                                <thead>
                                <tr>
                                    <td width="80%">NOME</td>
                                    <td width="20%">AÇÕES</td>
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
                        <h2>Gerenciar Categorias</h2>
                        <Loading/>
                    </div>
                </div>
            </main>)
    }
}

export default ManageCategory;