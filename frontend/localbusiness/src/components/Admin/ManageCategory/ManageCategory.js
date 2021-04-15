import React, {useContext, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import Loading from "../../Loading";
import TableActions from "../../Partials/TableActions";
import Feedback from "../../Partials/Feedback";
import MasterTable from "../../Partials/MasterTable";
import useGetEntity from "../../Hooks/useGetEntity";

const ManageCategory = ()=>{
    const [base] = useContext(BaseContext);
    const [utils] = useContext(UtilsContext);
    const [category, setCategory] = useState(null);
    const [itemWasDeleted, setItemWasDeleted] = useState(false);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const bearerToken = base.credentials.accessToken;
    const deps = {
        bearerToken : bearerToken,
        url : base.urls.category,
        setInitialFormState : setCategory,
        setInitData : null,
    }
    let output = <Loading/>;

    useGetEntity(deps);

    const processItemDelete = (response, id)=>{
        let updatedCategoryList = utils.removeItemFromList(category, id);
        setCategory(updatedCategoryList);
        setFeedback({active: true, message : 'Item removido com sucesso!', status:'success'});
        setItemWasDeleted(true);
    }

    if(category) {
        let tableLabels = [
            ['NOME',80],
            ['AÇÕES',20]
        ];
        let rows = category.map((item) => {
            return (
                <tr key={item.id}>
                    <td width="80%">{item.name}</td>
                    <TableActions
                        id={item.id}
                        view="/admin/category/"
                        edit="/admin/category/update/"
                        itemDeleteCallback={utils.itemDelete}
                        processItemDeleteCallback={processItemDelete}
                        urlItemDelete={base.urls.categoryDelete}
                        bearerToken={bearerToken}
                    />
                </tr>
            )
        })

        output = <div className="table-responsive"><MasterTable labels={tableLabels} rows={rows}/></div>;
    }

    return (
        <main className="container">
            <div className="row">
                <div className="col-sm-12 col-md-12  pt-5">
                    <h2>Gerenciar Categorias</h2>
                    {itemWasDeleted ? <Feedback params={feedback}/> : ''}
                    <div className="row">
                        <div className="col-md-12" style={{textAlign:"right"}}>
                            <a href="/admin/category/add" className="btn btn-primary mt-3"><em className="fa fa-plus"></em> Criar registro</a>
                        </div>
                    </div>
                    {output}
                </div>
            </div>
        </main>
    )
}

export default ManageCategory;