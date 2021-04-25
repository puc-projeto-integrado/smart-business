import React, {useContext, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import Loading from "../../Loading";
import TableActions from "../../Partials/TableActions";
import MasterTable from "../../Partials/MasterTable";
import useGetEntity from "../../Hooks/useGetEntity";
import Feedback from "../../Partials/Feedback";
import InputSelect from "../../Partials/InputSelect";
import {CommonUrls, CommonCredentials} from "../../Common";

const ManageBusiness = ()=>{
    let output = <Loading/>;
    const [base] = useContext(BaseContext);
    const [utils] = useContext(UtilsContext);
    const [business, setBusiness] = useState(null);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const [setFilteredBusiness] = useState(null);
    const [citiesInBusiness, setCitiesInBusiness] = useState([]);
    const bearerToken = CommonCredentials.accessToken;

    const setMyData = (data)=>{
        setBusiness(data);
        getCities(data);
    }

    const deps = {
        bearerToken : bearerToken,
        url : CommonUrls.business,
        setInitialFormState : setMyData,
        setInitData : null,
    }

    useGetEntity(deps);

    const getCities = (data)=>{
        let cities = [];
        console.log('GET Cities ', data);
        data.data.map((dataItem)=>{
            let discard = false;
            cities.forEach((item)=>{
                if(item.id === parseInt(dataItem.city_id)){
                    discard = true;
                    return false;
                }
            })
            if(!discard){
                let item = {id: dataItem.city_id, name : dataItem.city_name}
                cities.push(item)
            }
            return null;
        })
        setCitiesInBusiness(cities)
    }

    const FilterSelect = ()=>{
        return (
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <InputSelect selectedOption="" label="Filtrar por cidade:" name="cities" handleChange={filterByCity} options={citiesInBusiness}/>
                </div>
            </div>
        );
    }

    const filterByCity = (event)=>{
        const { value } = event.target;
        let filteredBusinessData = [];
        business.map((item)=> item.city_id === parseInt(value) ? filteredBusinessData.push(item) : '');
        setFilteredBusiness(filteredBusinessData)
    }

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
                {citiesInBusiness ? <FilterSelect/> : ''}
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