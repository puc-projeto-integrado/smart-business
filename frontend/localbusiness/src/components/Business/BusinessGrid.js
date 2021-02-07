import React, {useContext, useEffect, useState} from 'react';
import BusinessItem from './../Business/BusinessItem';
import Loading from './../Loading';
import {BaseContext} from '../ContextProviders/BaseContextProvider';
import InputSelect from "../Partials/InputSelect";
import CustomModal from "../Partials/CustomModal";

const BusinessGrid = (props) => {

    const [base] = useContext(BaseContext);
    const [business, setBusiness] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [filteredBusiness, setFilteredBusiness] = useState(null);
    const [citiesInBusiness, setCitiesInBusiness] = useState([]);
    const maxItems = props.maxItems ? props.maxItems : 7;
    let urlRequest = props.urlRequest ? props.urlRequest : base.urls.business;
    let numHighlights = 0;

    useEffect(() => {

        const setMyStates = (data)=>{
            setBusiness(data.data)
            if(props.setCategoryName) {
                let categoryName = data.data[0].category_name;
                props.setCategoryName(categoryName)
                getCities(data.data)
            }
        }
        fetch(`${urlRequest}`)
            .then(response => response.json())            
            .then(data => setMyStates(data))
    }, [urlRequest, props]);

    const handleShowModal = ()=>{
        console.log('Fired')
        setShowModal(true);
        console.log(showModal)
    }

    const getCities = (data)=>{
        let cities = [];

        data.map((dataItem)=>{
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

    if (business) {

        let data = filteredBusiness ? filteredBusiness : business;

        return (
            <div>

                <CustomModal title="Atenção!" description="Para adicionar um favorito você precisa estar logado."/>

                {!props.hideFilter ? <FilterSelect/> : ''}

                <div className="row">
                    {
                        data.map((item) => {
                            numHighlights++;
                            return (numHighlights < maxItems) ? <BusinessItem
                                data={item}
                                size={props.itemSize}
                                handleShowModal={handleShowModal}
                                key={numHighlights} /> : false;
                        })
                    }
                </div>
            </div>
        )
    } else {
        return <Loading/>
    }
}

export default BusinessGrid;