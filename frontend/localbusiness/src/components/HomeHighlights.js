import React, { useState, useEffect } from 'react';
import BusinessHighlight from './BusinessHighlight';
import Loading from './Loading';

const HomeHighlights = () => {

    const urlBusinessHighlights = 'http://localhost/public/api/business/highlight';
    const [highlights, setHighlights] = useState(null);    

    useEffect(() => {
        fetch(`${urlBusinessHighlights}`)
            .then(response => response.json())            
            .then(data => setHighlights(data.data))
    }, []);  
    
    let numHighlights = 0; 

    if (highlights) {
        return (
            <div>
                {
                    highlights.map((item) => {
                        numHighlights++;
                        return numHighlights < 3 ? <BusinessHighlight data={item} key={numHighlights}/> : ''
                    })
                }
            </div>
        )
    } else {
        return <Loading/>
    }
}

export default HomeHighlights;