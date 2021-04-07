import React, {useEffect, useState, useContext} from 'react';
import {useParams} from "react-router";
import Column from '../Column';
import Loading from '../Loading';
import BusinessItemDetail from "../Business/BusinessItemDetail";
import { BaseContext } from '../ContextProviders/BaseContextProvider';

const BusinessDetail = () => {

    const {id} = useParams();
    const [base] = useContext(BaseContext);
    const url = `${base.urls.businessDetail}/${id}`;
    const [business, setBusiness] = useState(null);
    let output = <Loading/>;

    useEffect(() => {
        fetch(url)
            .then(response => response.json())            
            .then(data => setMyStates(data))
    }, [url]);

    const setMyStates = (data)=>{
        setBusiness(data[0])
    }

    let columnOutput = <Loading/>;
    if(base.categories) {
        let categories = base.sortAlphabetically(base.categories);
        columnOutput = <Column categories={categories}/>
    }

    if (business) {

        let propsObj = {
            categoryName : business.category_name,
            cityName : business.city_name,
            name : business.name,
            description : business.description,
            address : business.address,
            website : business.website,
        }

        output = <BusinessItemDetail business={propsObj}/>
    }

    return (
        <main className="container">
            <div className="row">
                <div className="col-sm-12 col-md-8 pt-5">
                    {output}
                </div>
                <div className="col-4 d-none d-sm-block pt-5">
                    {columnOutput}
                </div>
            </div>
        </main>
    )
}

export default BusinessDetail;