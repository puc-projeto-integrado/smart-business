import React, {useContext, useEffect, useState} from 'react';
import AddFavorites from "../Partials/AddFavorites";
import RemoveFavorite from "../Partials/RemoveFavorite";
import { BaseContext } from '../ContextProviders/BaseContextProvider';

const BusinessItem = (props) => {
    const [base] = useContext(BaseContext);
    const [isFavoriteState, setIsFavoriteState] = useState(false);
    const [mustUnload, setMustUnload] = useState(false);
    const id = props.data.id;

    useEffect(() => {
        if(base.isFavorite){
            setIsFavoriteState(base.isFavorite(id));
        }
    }, [props, id, base]);

    const setIsFavorite=(status)=>{

        if(props.fromFavoritesPage){
            setMustUnload(true)
        }else {
            setIsFavoriteState(status);
        }
    }

    const funcRefs = {
        handleShowModal : props.handleShowModal,
        setIsFavorite : setIsFavorite
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
                            <p>{(props.data.description) ? props.data.description.substr(0, 160) : 'Não informado.'}</p>

                            <div className="row">
                                <div className="col-6">
                                    { (props.hideAddFavorites) ?
                                        <RemoveFavorite funcRefs={funcRefs.setIsFavorite} businessId={props.data.id}/> : (!isFavoriteState) ? <AddFavorites funcRefs={funcRefs} businessId={props.data.id}/> : <RemoveFavorite funcRefs={setIsFavorite} businessId={props.data.id}/>}
                                </div>
                                <div className="col-6">
                                    <a href={`/business/${id}`} className="btn btn-outline-primary btn-block"><span className="fas fa-eye"></span> Ver Detalhes</a>
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