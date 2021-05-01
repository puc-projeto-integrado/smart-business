import React, {useContext, useEffect, useState, useRef} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import Loading from "../../Loading";
import TableActions from "../../Partials/TableActions";
import MasterTable from "../../Partials/MasterTable";
import Feedback from "../../Partials/Feedback";
import FilterSelect from "../../Partials/FilterSelect";
import {CommonUrls, CommonCredentials, CommonFunctions} from "../../Common";

const ManageBusiness = React.memo(()=>{
    let output;
    const [base] = useContext(BaseContext);
    const [utils] = useContext(UtilsContext);
    const [business, setBusiness] = useState(null);
    const [ufStates, setUfStates] = useState(null);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const bearerToken = CommonCredentials.accessToken;
    const myRef = useRef('');
    // Get States
    useEffect(() => {
        fetch(CommonUrls.state, CommonFunctions.getDefaultRequestOptions())
            .then(response => response.json())
            .then(data => setUfStates(data))
            .catch(error => console.log('error', error));
    }, []);

    const processItemDelete = (response, id)=>{
        let updatedList = utils.removeItemFromList(business.data, id);
        let obj = business;
        obj.data = updatedList;
        setBusiness(obj);
        setFeedback({active: true, message : 'Item removido com sucesso!', status:'success'});
    }

    const FormCombo = React.memo(()=> {
        const [selectedState, setSelectedState] = useState(null);

        if(ufStates){
            const handleChangeUfState = (event)=>{
                const { name, value } = event.target;
                setSelectedState(value)
            }

            if(selectedState){
                myRef.current = selectedState
                fetch(`${CommonUrls.businessByState}/${selectedState}`, CommonFunctions.getDefaultRequestOptions())
                    .then(response => response.json())
                    .then(data => setBusiness(data))
                    .catch(error => console.log('error', error));
            }

            let deps = {
                label : 'Estados:',
                name : 'state',
                handleChange : handleChangeUfState,
                data : ufStates,
                myRef : myRef
            }
            return <FilterSelect deps={deps}/>
        }else{
            return <div>Loading...</div>
        }
    })

    if(business) {
        let tableLabels = [['NOME',30], ['CIDADE',25], ['CATEGORIA',25], ['AÇÕES',20]];

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

        const exportPdf = ()=> window.open(`${CommonUrls.pdfByState}/${myRef.current}`);

        output = (
            <>
            <div>
                <button onClick={exportPdf} className="btn btn-primary btn-block mt-3"><em className="fa fa-file-pdf"></em> EXPORTAR PDF</button>
            </div>
            <div className="table-responsive">
                <MasterTable labels={tableLabels} rows={rows}/>
            </div>
            </>
        );
    }

    return (
        <main className="container">
            <div className="row">
                <div className="col-sm-12 col-md-12  pt-5">
                    <h2>Gerenciar Empresas</h2>
                    <Feedback params={feedback}/>
                    <p><span className="fa fa-exclamation-circle"></span> Selecione um Estado para começar:</p>
                    <FormCombo/>
                    {output}
                </div>
            </div>
        </main>)
})

export default ManageBusiness;