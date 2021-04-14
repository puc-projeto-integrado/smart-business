import React, {useContext, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import Loading from "../../Loading";
import TableActions from "../../Partials/TableActions";
import MasterTable from "../../Partials/MasterTable";
import Feedback from "../../Partials/Feedback";
import useGetEntity from "../../Hooks/useGetEntity";
import InputSelect from "../../Partials/InputSelect";
import {CommonCredentials, CommonUrls} from "../../Common";

const ManageCity = ()=>{
    const [base] = useContext(BaseContext);
    const [utils] = useContext(UtilsContext);
    const [uf, setUf] = useState(null);
    const [city, setCity] = useState(null);
    const [selectedUfId, setSelectedUfId] = useState('');
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const bearerToken = CommonCredentials.accessToken;
    let output;
    let ufSelect;

    const deps = {
        bearerToken : bearerToken,
        url : CommonUrls.uf,
        setInitialFormState : setUf,
        setInitData : null,
    }
    useGetEntity(deps);

    const processItemDelete = (response, id)=>{
        //let updatedList = utils.removeItemFromList(user, id);
        //setCity(updatedList);
        setFeedback({active: true, message : 'Item removido com sucesso!', status:'success'});
    }

    const handleUfChange = (event) => {
        const { name, value } = event.target;
        console.log('handleUfChange VALUE ', value)
        setCity(null)
        setSelectedUfId(value);
    }

    if(selectedUfId && !city){
        console.log('if selectedUfId')
        let cityHeaders = new Headers();
        cityHeaders.append("Authorization", `Bearer ${deps.bearerToken}`);
        let requestOptions = { method: 'GET', headers: cityHeaders,};

        fetch(`${CommonUrls.citiesByState}/${selectedUfId}`, requestOptions)
            .then(response => response.json())
            .then(data => setCity(data))
            .catch(error => console.log('error', error));
    }

    if(city) {
        console.log('if city')
        let tableLabels = [
            ['NOME',80],
            ['AÇÕES',20]
        ];

        let rows = city.map((item) => {
            return (
                <tr key={item.id}>
                    <td width="24%">{item.name}</td>
                            <TableActions
                                id={item.id}
                                view="/admin/user/"
                                edit="/admin/user/update/"
                                itemDeleteCallback={utils.itemDelete}
                                processItemDeleteCallback={processItemDelete}
                                urlItemDelete={base.urls.userDelete}
                                bearerToken={bearerToken}
                            />
                </tr>
            )
        })

        output = (<div className="table-responsive"><MasterTable labels={tableLabels} rows={rows}/></div>)
    }

    if(uf) {
        ufSelect = <InputSelect selectedOption={selectedUfId} label="Selecione um Estado" name="uf" handleChange={handleUfChange} options={uf}/>
    }

    return (
        <main className="container">
            <div className="row">
                <div className="col-sm-12 col-md-12  pt-5">
                    <h2>Gerenciar Cidades</h2>
                    <div className="row">
                        <div className="col-md-6">{ufSelect}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-12" style={{textAlign:"right"}}>
                            <button className="btn btn-primary mt-3"><em className="fa fa-plus"></em> Criar registro</button>
                        </div>
                    </div>
                    <Feedback params={feedback}/>
                    {output}
                </div>
            </div>
        </main>
    )
}
export default ManageCity;