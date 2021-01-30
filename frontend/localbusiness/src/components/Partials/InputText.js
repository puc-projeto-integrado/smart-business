import React from "react";

const InputText = (props)=>{
    return (
        <div className={props.className ? props.className : 'mt-4'}>
            <label htmlFor="name">{props.label}</label>
            <input className="form-control" type="text" onChange={props.handleChange} name={props.name} value={props.value?props.value:''}/>
        </div>
    )
}

export default InputText;