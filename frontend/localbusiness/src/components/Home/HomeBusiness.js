import React, { useState, useEffect } from 'react';
import BusinessItem from './../Business/BusinessItem';
import Loading from './../Loading';

const HomeBusiness = () => {

    const urlBusiness = 'http://localhost/public/api/business';
    const [business, setBusiness] = useState(null);    

    useEffect(() => {
        fetch(`${urlBusiness}`)
            .then(response => response.json())            
            .then(data => setBusiness(data.data))
    }, []);  
    
    let numHighlights = 0; 

    if (business) {
        return (
            <div className="row">
                {
                    business.map((item) => {
                        numHighlights++;
                        return (numHighlights < 7) ? <BusinessItem data={item} key={numHighlights} /> : false;
                    })
                }
            </div>
        )
    } else {
        return <Loading/>
    }
}

export default HomeBusiness;