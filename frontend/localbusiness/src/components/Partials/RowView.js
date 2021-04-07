import React from "react";

const RowView = (props)=>{
    //console.log('ROW_VIEW ', props)
    return (
        <div className="mb-3">
            <label htmlFor={props.htmlFor}><strong>{props.name}:</strong></label><br/>
            {props.value}
        </div>
    )
}

export default RowView;