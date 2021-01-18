import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import Column from '../Column';
import Loading from '../Loading';

const BusinessDetail = () => {

    let {id} = useParams();

    const url = `http://localhost/public/api/business/${id}`;
    const [business, setBusiness] = useState(null);    

    useEffect(() => {
        fetch(url)
            .then(response => response.json())            
            .then(data => setBusiness(data[0]))
    }, [url]);

    if (business) {
        console.log('done', business)
        return (
            <main className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-8 pt-5">
                        <h3>{business.category_name} em {business.city_name}</h3>
                        <h1>{business.name}</h1>
                        <p>{business.description}</p>

                        <span>Como chegar?</span>
                        <h4>Endereço de {business.name}</h4>
                        {business.address}
                        <h4>Website</h4>
                        <a href="{business.website}">{business.website}</a>
                    </div>
                    <div className="col-4 d-none d-sm-block pt-5">
                        <Column />
                    </div>
                </div>
            </main>
        )
    } else {
        return (
            <main className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-8  pt-5">
                        <Loading />
                    </div>
                    <div className="col-4 d-none d-sm-block pt-5">
                        <Column />
                    </div>
                </div>
            </main>
        )
    }
}

export default BusinessDetail;