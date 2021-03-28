import React from "react";

const TableActions = (props)=>{
    return (
        <>
            <a href={props.view} title="Visualizar"><em className="fa fa-eye ml-2"></em></a>
            <a href={props.edit} title="Editar"><em className="fa fa-edit ml-2"></em></a>
            <a href={props.delete} title="Excluir"><em className="fa fa-trash ml-2"></em></a>
        </>
    )
}

export default TableActions;