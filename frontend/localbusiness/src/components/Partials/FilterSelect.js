import React from "react";
import InputSelect from "./InputSelect";

const FilterSelect = (props)=>{
    let deps = props.deps;
    return (
        <div className="row">
            <div className="col-md-12 col-sm-12">
                <InputSelect selectedOption={deps.myRef.current} label={deps.label} name={deps.name} handleChange={deps.handleChange} options={deps.data}/>
            </div>
        </div>
    );
}

export default FilterSelect;