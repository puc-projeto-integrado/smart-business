import React from "react";

const AddToFavorites = (props)=>{

    console.log(props)
    const addToFavorites = ()=>{
        console.log("addToFavorites")
    }

    return (
        <button onClick={addToFavorites} className="btn btn-outline-primary btn-block"><span className="fas fa-star"></span> Adicionar aos Favoritos</button>
    )
}

export default AddToFavorites;