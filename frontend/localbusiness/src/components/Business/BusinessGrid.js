import React, {useState, useEffect, useContext} from 'react';
import BusinessItem from './../Business/BusinessItem';
import Loading from './../Loading';
import { BaseContext } from '../ContextProviders/BaseContextProvider';

const BusinessGrid = (props) => {

    const [base] = useContext(BaseContext);
    const [business, setBusiness] = useState(null);
    const maxItems = props.maxItems ? props.maxItems : 7;
    let urlRequest = props.urlRequest ? props.urlRequest : base.urls.business;
    let numHighlights = 0;

    useEffect(() => {
        fetch(`${urlRequest}`)
            .then(response => response.json())            
            .then(data => setBusiness(data.data))
    }, [urlRequest]);

    if (business && props.favoritesData) {
        return (
            <div className="row">
                {
                    business.map((item) => {
                        numHighlights++;
                        return (numHighlights < maxItems) ? <BusinessItem
                            data={item}
                            size={props.itemSize}
                            key={numHighlights} /> : false;
                    })
                }
            </div>
        )
    } else {
        return <Loading/>
    }
}

export default BusinessGrid;