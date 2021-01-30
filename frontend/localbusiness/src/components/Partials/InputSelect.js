import React from "react";

const InputSelect = (props)=>{
    return (
        <div className={props.className ? props.className : 'mt-4'}>
            <label htmlFor="name">{props.label}</label>
            <select className="form-control" type="text" onChange={props.handleChange} name={props.name} >
                <option value="">Selecione uma opção</option>
            </select>
        </div>
    )
}

export default InputSelect;