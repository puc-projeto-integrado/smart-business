import React from "react";

const TableActions = (props)=>{
    const urlView = `${props.view}${props.id}`;
    const urlEdit = `${props.edit}${props.id}`;

    const callMeBack = ()=>{
        props.delete(props.id);
    }

    return (
        <>
            <a href={urlView} title="Visualizar"><em className="fa fa-eye ml-2"></em></a>
            <a href={urlEdit} title="Editar"><em className="fa fa-edit ml-2"></em></a>
            <a href="#" onClick={callMeBack} title="Excluir"><em className="fa fa-trash ml-2"></em></a>
        </>
    )
}

export default TableActions;