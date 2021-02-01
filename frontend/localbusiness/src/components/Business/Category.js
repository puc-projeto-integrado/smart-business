import React, { useContext } from "react";
import {useParams} from "react-router";
import Column from "../Column";
import BusinessGrid from './BusinessGrid';
import { BaseContext } from '../ContextProviders/BaseContextProvider';

const Category = ()=>{

    let {id} = useParams();
    const [base] = useContext(BaseContext);
    const urlRequest = `${base.urls.businessCategory}/${id}`;

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-8  pt-5">
                    <h2>Categoria</h2>
                    <BusinessGrid maxItems={20} urlRequest={urlRequest} queryIsFavorite={base.isFavorite} favoritesData={base.favorites} categoryId={id} itemSize='full'/>
                </div>
                <div className="col-4 d-none d-sm-block pt-5">
                    <Column />
                </div>
            </div>
        </div>
    )
}

export default Category;