import React, {useState} from "react";

const InputSelect = (props)=>{
    const [selectedOption] = useState(props.selectedOption);
    const options = props.options;

    if(options) {
        return (
            <div className={props.className ? props.className : 'mt-4'}>
                <label htmlFor="name">{props.label}</label>
                <select className="form-control" onChange={props.handleChange} name={props.name} value={selectedOption ? selectedOption : ''}>
                    <option value="">Selecione uma opção</option>
                    {
                        options.map((item) => {
                            return <option  value={item.id} key={item.id}>{item.name}</option>
                        })
                    }
                </select>
            </div>
        )
    }else{
        return null
    }

}

export default InputSelect;