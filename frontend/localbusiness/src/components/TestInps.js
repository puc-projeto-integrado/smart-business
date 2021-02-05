import React, {useState, useContext} from 'react';
import InputText from './Partials/InputText';
import { BaseContext } from './ContextProviders/BaseContextProvider';

const TestInps = ()=>{
    const formItems = { name: "", cnpj: "", email: ""};
    const [state, setState] = useState(formItems);
    const [base] = useContext(BaseContext);

    const handleChange = (event)=>{
        const { name, value } = event.target;
        console.log("STATE ", state)
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const FormInputs = ()=>{
        return (
            <div>
                <InputText label="Nome" name="name" value={state.name} handleChange={handleChange}/>
            </div>
        )
    }

    return (
        <FormInputs/>
    )
}

export default TestInps;