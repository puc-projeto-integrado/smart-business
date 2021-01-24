import React from 'react';
import AddToFavorites from "../Partials/AddToFavorites";

const BusinessItem = (props) => {


    return (
        <div className="col-md-6 col-sm-12">
            <div className="business-post">
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <h4 className="gray-4">{props.data.name}</h4>
                        <p>{props.data.description.substr(0,160)}</p>

                        <div className="row">
                            <div className="col-6">
                                <AddToFavorites businessId={props.data.id}/>
                            </div>
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