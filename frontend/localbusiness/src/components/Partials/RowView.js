import React from "react";

const RowView = (props)=>{
    return (
        <div className="mb-3">
            <label htmlFor={props.key}><strong>{props.name}:</strong></label><br/>
            {props.value}
        </div>
    )
}

export default RowView;