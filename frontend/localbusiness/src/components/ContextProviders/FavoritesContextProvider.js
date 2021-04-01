import React, {useState, createContext} from "react";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = props => {

    const [favoritesState, setFavoritesState] = useState(null);

    return (
        <FavoritesContext.Provider value={[favoritesState, setFavoritesState]}>
            {props.children}
        </FavoritesContext.Provider>
    );
};