import React, { useState, useEffect, useContext } from 'react';
import {CommonUrls} from "./../Common";
import BusinessItemHighlight from './../Business/BusinessItemHighlight';
import Loading from './../Loading';

const HomeHighlights = (props) => {
    const url = CommonUrls.businessHighlight;
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
                        let thumb = `img-${numHighlights}.jpg`;
                        return numHighlights < 4 ? <BusinessItemHighlight thumb={thumb} queryIsFavorite={props.queryIsFavorite} data={item} key={numHighlights}/> : ''
                    })
                }
            </div>
        )
    } else {
        return <Loading/>
    }
}

export default HomeHighlights;