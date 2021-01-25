import React from 'react';
import AddToFavorites from "../Partials/AddToFavorites";

const BusinessItem = (props) => {

    let columSizeStyle = 'col-md-6 col-sm-12';

    if(props.size==='full'){
        columSizeStyle = 'col-md-12 col-sm-12'
    }

    return (

        <div className={columSizeStyle}>
            <div className="business-post">
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <a href="http://localhost" className="info"><span className="fas fa-map-marker-alt"></span> {props.data.category_name} em {props.data.city_name}</a>
                        <h4 className="gray-4">{props.data.name}</h4>
                        <p>{props.data.description.substr(0,160)}</p>

                        <div className="row">
                            {(props.showAddFavorites) ? <div className="col-6"><AddToFavorites businessId={props.data.id} /></div>: '' }

                            <div className="col-6">
                                <a href={`/business-detail/${props.data.id}`} className="btn btn-outline-primary btn-block"><span className="fas fa-eye"></span> Ver Detalhes</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessItem;