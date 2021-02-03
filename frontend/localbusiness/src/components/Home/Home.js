import React, {useContext} from 'react';
import Column from './../Column';
import HomeHighlights from './HomeHighlights';
import BusinessGrid from './../Business/BusinessGrid';
import { BaseContext } from '../ContextProviders/BaseContextProvider';

const Home = () => {

    const [base] = useContext(BaseContext);

    return (
        <main className="container">
            <div className="row">
                <div className="col-sm-12 col-md-8  pt-5">
                    <HomeHighlights queryIsFavorite={base.isFavorite} favoritesData={base.favorites}/>
                </div>
                <div className="col-4 d-none d-sm-block pt-5">
                    <Column />
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h3 className="mt-5">Mais Recentes</h3>
                    <BusinessGrid hideFilter={true} queryIsFavorite={base.isFavorite} favoritesData={base.favorites} />
                </div>
            </div>
        </main>
    );
}

export default Home;