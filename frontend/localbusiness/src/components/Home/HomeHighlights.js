import React, { useState, useEffect, useContext } from 'react';
import BusinessItemHighlight from './../Business/BusinessItemHighlight';
import Loading from './../Loading';
import { BaseContext } from '../ContextProviders/BaseContextProvider';

const HomeHighlights = (props) => {

    const [base] = useContext(BaseContext);
    const url = base.urls.businessHighlight;
    const [highlights, setHighlights] = useState(null);

    useEffect(() => {
        fetch(`${url}`)
            .then(response => response.json())
            .then(data => setHighlights(data.data))
            .catch(error => console.log('errors', error));

    }, [url]);

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