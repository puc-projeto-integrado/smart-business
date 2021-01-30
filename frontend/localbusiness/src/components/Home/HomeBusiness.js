import React, { useState, useEffect } from 'react';
import BusinessItem from './../Business/BusinessItem';
import Loading from './../Loading';

const HomeBusiness = (props) => {

    const urlBusiness = 'http://localhost/public/api/business';
    const [business, setBusiness] = useState(null);    
    const maxItems = 7;

    useEffect(() => {
        console.log('COUNT')
        fetch(`${urlBusiness}`)
            .then(response => response.json())            
            .then(data => setBusiness(data.data))
    }, []);  
    
    let numHighlights = 0;

    if (business && props.favoritesData) {
        return (
            <div className="row">
                {
                    business.map((item) => {
                        numHighlights++;
                        return (numHighlights < maxItems) ? <BusinessItem queryIsFavorite={props.queryIsFavorite} isFavorite={false} favoritesData={props.favoritesData} data={item} key={numHighlights} /> : false;
                    })
                }
            </div>
        )
    } else {
        return <Loading/>
    }
}

export default HomeBusiness;