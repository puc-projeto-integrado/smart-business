import React, {useState} from "react";

const InputSelect = (props)=>{
console.log('InputSelect ', props.selectedOption)
    const options = props.options;
    if(options) {

        let output = options.map((item) => <option value={item.id} key={item.id}>{item.name}</option>);

        return (
            <div className={props.className ? props.className : 'mt-4'}>
                <label htmlFor="name">{props.label}</label>
                <select className="form-control"
                        onChange={props.handleChange}
                        name={props.name}
                        value={props.selectedOption ? props.selectedOption : ''}>
                    <option value="">Selecione uma opção</option>
                    {output}
                </select>
            </div>
        )
    }else{
        return null
    }

}

export default InputSelect;