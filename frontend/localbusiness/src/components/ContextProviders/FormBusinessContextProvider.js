import React, {useState, createContext} from "react";

export const FormBusinessContext = createContext();

export const FormBusinessContextProvider = props => {

    const [formState, setFormState] = useState({ name: "", cnpj: "", email: "", website: "", address: "", district: "", description: "", });

    return (
        <FormBusinessContext.Provider value={[formState, setFormState]}>
            {props.children}
        </FormBusinessContext.Provider>
    );
};