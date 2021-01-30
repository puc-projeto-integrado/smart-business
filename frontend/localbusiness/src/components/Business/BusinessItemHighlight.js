import React, {useEffect, useState} from 'react';
import AddFavorites from '../Partials/AddFavorites';
import RemoveFavorite from "../Partials/RemoveFavorite";

const BusinessItemHighlight = (props) => {
    //console.log('BusinessItemHighlight', props.favoritesData)
    const [isFavoriteState, setIsFavoriteState] = useState(false);
    let data = props.data;
    let id = props.data.id;

    useEffect(() => {
        if(props.queryIsFavorite){
            setIsFavoriteState(props.queryIsFavorite(id));
        }
    }, [props, id]);

    const setIsFavorite=(status)=>{
        setIsFavoriteState(status)
    }

    return (
        <div>
            <div className="business-post highlight">
            <div className="row">
                <div className="col-4 image-holder d-none d-sm-block">
                    <img src="./assets/images/thumb-limpeza.jpg" alt=""/>
                </div>
                <div className="col-md-8 col-sm-12">
                    <a href="http://localhost" className="info"><span className="fas fa-map-marker-alt"></span> {data.category_name} em {data.city_name}</a>
                        <h4 className="gray-5">{data.name}</h4>
                    <p className="gray-5">{data.description}</p>

                    <div className="row">
                        <div className="col-6">
                        {!isFavoriteState ? <AddFavorites funcRefs={setIsFavorite} businessId={id}/> : <RemoveFavorite funcRefs={setIsFavorite}/>}
                        </div>
                        <div className="col-6">
                            <a href={`/business-detail/${id}`} className="btn btn-outline-primary btn-block"><span className="fas fa-eye"></span> Ver Detalhes</a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        </div>
    )
}
  
export default BusinessItemHighlight;