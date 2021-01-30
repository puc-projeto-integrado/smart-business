import React, {useEffect, useState} from 'react';
import AddFavorites from "../Partials/AddFavorites";
import RemoveFavorite from "../Partials/RemoveFavorite";

const BusinessItem = (props) => {

    const [isFavoriteState, setIsFavoriteState] = useState(false);
    const [mustUnload, setMustUnload] = useState(false);
    const id = props.data.id;

    useEffect(() => {
        if(props.queryIsFavorite){
            setIsFavoriteState(props.queryIsFavorite(id));
        }
    }, [props, id]);

    const setIsFavorite=(status)=>{
        console.log('changing status to '+status)

        if(props.fromFavoritesPage){
            setMustUnload(true)
        }else {
            setIsFavoriteState(status);
        }
    }

    let columSizeStyle = props.size==='full' ? 'col-md-12 col-sm-12' : 'col-md-6 col-sm-12';

    if(!mustUnload){
        return (
            <div className={columSizeStyle}>
                <div className="business-post">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <a href="http://localhost" className="info"><span className="fas fa-map-marker-alt"/> {props.data.category_name} em {props.data.city_name}</a>
                            <h4 className="gray-4">{props.data.name}</h4>
                            <p>{props.data.description.substr(0, 160)}</p>

                            <div className="row">
                                <div className="col-6">
                                    { (props.hideAddFavorites) ?
                                        <RemoveFavorite funcRefs={setIsFavorite} businessId={props.data.id}/> : (!isFavoriteState) ? <AddFavorites funcRefs={setIsFavorite} businessId={props.data.id}/> : <RemoveFavorite funcRefs={setIsFavorite} businessId={props.data.id}/>}
                                </div>
                                <div className="col-6">
                                    <a href={`/business-detail/${id}`}
                                       className="btn btn-outline-primary btn-block"><span
                                        className="fas fa-eye"></span> Ver Detalhes</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return null;
    }

}

export default BusinessItem;