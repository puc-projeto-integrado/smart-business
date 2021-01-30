import React, {useEffect, useState} from "react";
import BusinessItem from "./Business/BusinessItem";
import Column from "./Column";
import InputText from "./Partials/InputText";
import InputSelect from "./Partials/InputSelect";
import {read_cookie} from "sfcookies";

const BusinessRegister = ()=>{

    const [uf, setUf] = useState(null);
    const url =  `http://localhost/public/api/state`;

    var requestOptions = {
        method: 'GET',
    };

    useEffect(() => {
        if(!uf) {
            fetch(url, requestOptions)
                .then(response => response.json())
                //.then(data => console.log(data))
                .then(data => setUf(data))
                .catch(error => console.log('error', error));
        }
    }, [url, requestOptions, uf]);

    const formItems = {
        name: "",
        cnpj: "",
        email: "",
        website: "",
        address: "",
        district: "",
    };

    const [state, setState] = useState(formItems);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }
    const handleSubmit = (event) => {}

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-8 pt-5 offset-md-2">

                    <h2>Cadastre sua empresa</h2>

                    <InputText label="Nome" name="name" value={state.name} handleChange={handleChange} />
                    <InputText label="CNPJ" name="cnpj" value={state.cnpj} handleChange={handleChange} />
                    <InputText label="Email" name="email" value={state.email} handleChange={handleChange} />
                    <InputText label="Website" name="website" value={state.website} handleChange={handleChange} />

                    { uf ? <InputSelect label="Estado" options={uf}/> : '' }
                    <InputSelect label="Cidade"/>

                    <InputText label="Endereço" name="address" value={state.address} handleChange={handleChange} />
                    <InputText label="Bairro" name="district" value={state.district} handleChange={handleChange} />

                    <div className="mt-3">
                        <label htmlFor="description">Descrição</label>
                        <textarea name="description" id="description" className="form-control" onChange={handleChange}></textarea>
                    </div>

                    <button onClick={handleSubmit} className="btn btn-primary mt-3">SALVAR</button>

                </div>

            </div>
        </div>
    )
}

export default BusinessRegister;