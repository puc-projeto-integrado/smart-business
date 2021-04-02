import React, {useContext, useEffect, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import Loading from "../../Loading";
import TableActions from "../../Partials/TableActions";
import Feedback from "../../Partials/Feedback";
import MasterTable from "../../Partials/MasterTable";

const ManageCategory = ()=>{

    const [base] = useContext(BaseContext);
    const [utils] = useContext(UtilsContext);
    const [category, setCategory] = useState(null);
    const [itemWasDeleted, setItemWasDeleted] = useState(false);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const bearerToken = base.credentials.accessToken;

    useEffect(() => {
        fetch(base.urls.category)
            .then(response => response.json())
            .then(data => setCategory(data))
    }, [base.urls.category]);

    const processItemDelete = (response, id)=>{
        let updatedCategoryList = utils.removeItemFromList(category, id);
        setCategory(updatedCategoryList);
        setFeedback({active: true, message : 'Item removido com sucesso!', status:'success'});
        setItemWasDeleted(true);
    }

    if(category) {
        let tableLabels = ['NOME', 'AÇÕES'];
        let rows = category.map((item) => {
            return (
                <tr key={item.id}>
                    <td width="80%">{item.name}</td>
                    <TableActions
                        id={item.id}
                        view="/admin/category/"
                        edit="/admin/business/update/"
                        itemDeleteCallback={utils.itemDelete}
                        processItemDeleteCallback={processItemDelete}
                        urlItemDelete={base.urls.categoryDelete}
                        bearerToken={bearerToken}
                    />
                </tr>
            )
        })

        return (
            <main className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-12 pt-5">
                        <h2>Gerenciar Categorias</h2>
                        {itemWasDeleted ? <Feedback params={feedback}/> : ''}
                        <div className="table-responsive">
                            <MasterTable labels={tableLabels} rows={rows}/>
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
            </main>
        )
    }
}

export default ManageCategory;