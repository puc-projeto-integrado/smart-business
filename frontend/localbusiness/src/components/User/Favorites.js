import React, {useContext} from "react";
import BusinessItem from "../Business/BusinessItem";
import Column from "../Column";
import { BaseContext } from '../ContextProviders/BaseContextProvider';
import Loading from "../Loading";

const Favorites = ()=>{

    const [base] = useContext(BaseContext);

    const ShowFavorites = ()=>{
        let numItems = 0;

        if(base.favorites.length>0) {
            return (
                base.favorites.map((item) => {
                    numItems++;
                    return (numItems < 50) ?
                        <BusinessItem size="full" fromFavoritesPage={true} hideAddFavorites={true} data={item}
                                      key={numItems}/> : false;
                })
            )
        }else{
            return <div>Você ainda não tem favoritos cadastrados...</div>
        }
    }
    let columnOutput = <Loading/>;
    if(base.categories) {
        let categories = base.sortAlphabetically(base.categories);
        columnOutput = <Column categories={categories}/>
    }
    if(base.favorites){
        return (
            <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-8  pt-5">
                    <h2>Favoritos</h2>
                    <ShowFavorites />
                </div>
                <div className="col-4 d-none d-sm-block pt-5">
                    {columnOutput}
                </div>
            </div>
            </div>
        )

    }else{
        return (
            <div className="container mt-5">
                <h2>Favorites</h2>
                <p>Loading...</p>
            </div>
        )
    }


}
export default Favorites;