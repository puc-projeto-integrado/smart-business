import React, { useState, useEffect } from 'react';
import Business from './Business';
import Loading from './Loading';

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
                        if (numHighlights < 7) {
                            return <Business data={item} key={numHighlights} />;

                        } else {
                            return false;
                        }
                    })
                }
            </div>
        )
    } else {
        return <Loading/>
    }
}

export default HomeBusiness;