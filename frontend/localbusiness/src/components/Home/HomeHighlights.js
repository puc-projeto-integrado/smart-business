import React, { useState, useEffect } from 'react';
import BusinessItemHighlight from './../Business/BusinessItemHighlight';
import Loading from './../Loading';

const HomeHighlights = (props) => {

    const url = 'http://localhost/public/api/business/highlight';
    const [highlights, setHighlights] = useState(null);

    useEffect(() => {
        fetch(`${url}`)
            .then(response => response.json())
            .then(data => setHighlights(data.data))
            .catch(error => console.log('errors', error));

    }, []);

    let numHighlights = 0; 

    if (highlights) {
        return (
            <div>
                {
                    highlights.map((item) => {
                        numHighlights++;
                        return numHighlights < 4 ? <BusinessItemHighlight queryIsFavorite={props.queryIsFavorite} data={item} key={numHighlights}/> : ''
                    })
                }
            </div>
        )
    } else {
        return <Loading/>
    }
}

export default HomeHighlights;