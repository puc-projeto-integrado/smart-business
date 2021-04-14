import React, {useContext, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import Loading from "../../Loading";
import TableActions from "../../Partials/TableActions";
import MasterTable from "../../Partials/MasterTable";
import useGetEntity from "../../Hooks/useGetEntity";
import Feedback from "../../Partials/Feedback";

const ManageBusiness = ()=>{
    let output = <Loading/>;
    const [base] = useContext(BaseContext);
    const [utils] = useContext(UtilsContext);
    const [business, setBusiness] = useState(null);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const bearerToken = base.credentials.accessToken;
    const deps = {
        bearerToken : bearerToken,
        url : base.urls.business,
        setInitialFormState : setBusiness,
        setInitData : null,
    }

    useGetEntity(deps);

    const processItemDelete = (response, id)=>{
        let updatedList = utils.removeItemFromList(business.data, id);
        let obj = business;
        obj.data = updatedList;
        setBusiness(obj);
        setFeedback({active: true, message : 'Item removido com sucesso!', status:'success'});
    }

    if(business) {
        console.log('BUS... ', business)
        let tableLabels = [
            ['NOME',30],
            ['CIDADE',25],
            ['CATEGORIA',25],
            ['AÇÕES',20]
        ];

        let rows = business.data.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.city_name}</td>
                    <td>{item.category_name}</td>
                    <TableActions
                        id={item.id}
                        add='/admin/business/add'
                        view="/admin/business/"
                        edit="/admin/business/update/"
                        itemDeleteCallback={utils.itemDelete}
                        processItemDeleteCallback={processItemDelete}
                        urlItemDelete={base.urls.businessDelete}
                        bearerToken={bearerToken}
                        delete="#" />
                </tr>
            )
        })
        output = (
            <div className="table-responsive">
                <MasterTable labels={tableLabels} rows={rows}/>
            </div>
        );
    }

    return (
        <main className="container">
            <div className="row">
                <div className="col-sm-12 col-md-12  pt-5">
                    <h2>Gerenciar Empresas</h2>
                    <Feedback params={feedback}/>
                    {output}
                </div>
            </div>
        </main>)
}

export default ManageBusiness;