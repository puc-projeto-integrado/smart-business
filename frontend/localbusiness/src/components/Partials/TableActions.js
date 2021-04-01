import React from "react";

const TableActions = (props)=>{
    const urlView = `${props.view}${props.id}`;
    const urlEdit = `${props.edit}${props.id}`;
    const urlDelete = `#`;
    const bearerToken = props.bearerToken;
    const urlItemDelete = props.urlItemDelete;
    const id = props.id;
    const processItemDeleteCallback = props.processItemDeleteCallback;

    const callMeBack = ()=>{
        props.itemDeleteCallback(id, bearerToken, urlItemDelete, processItemDeleteCallback);
    }

    return (
        <td>
            <a href={urlView} title="Visualizar"><em className="fa fa-eye ml-2"></em></a>
            <a href={urlEdit} title="Editar"><em className="fa fa-edit ml-2"></em></a>
            <a href={urlDelete} onClick={callMeBack} title="Excluir"><em className="fa fa-trash ml-2"></em></a>
        </td>
    )
}

export default TableActions;