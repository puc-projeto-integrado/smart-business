import React, {useEffect, useState, useRef} from "react";
import InputText from "./Partials/InputText";
import InputSelect from "./Partials/InputSelect";
import {read_cookie} from "sfcookies";

const BusinessRegister = (props)=>{

    const cookie = read_cookie('credentials');
    const userId = cookie.id;
    const accessToken = cookie.access_token;

    // const formItems = { user_id: userId, category_id: "", name: "", cnpj: "", email: "", website: "", address: "", district: "", description: "", };
    const formItems = { user_id: userId, category_id: "5", city_id: "454", name: "FooCia", cnpj: "123456", email: "foo@foo.com", website: "foo.com.br", address: "An simple address", district: "Fooland", description: "A simple description...", };
    const [state, setState] = useState(formItems);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [uf, setUf] = useState(null);
    const [categories, setCategories] = useState(null);
    const [cities, setCities] = useState(null);
    const [selectedUfId, setSelectedUfId] = useState(null);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    var requestOptions = { method: 'GET', };

    useEffect(() => {
        console.log('Render register...')
        const urlUf =  `http://localhost/public/api/state`;
        const urlCategories =  `http://localhost/public/api/category`;

        if(!uf) {
            fetch(urlUf, requestOptions)
                .then(response => response.json())
                .then(data => setUf(data))
                .catch(error => console.log('error', error));
        }

        if(!categories) {
            fetch(urlCategories, requestOptions)
                .then(response => response.json())
                .then(data => setCategories(data))
                .catch(error => console.log('error', error));
        }
    }, [uf]);

    if(selectedUfId && !cities){
        fetch(`http://localhost/public/api/state/${selectedUfId}`, requestOptions)
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => console.log('error', error));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));

        if(name==='uf'){
            setCities(null)
            setSelectedUfId(value);
        }
        if(name==='city_id'){ setSelectedCityId(value); }
        if(name==='category_id'){ setSelectedCategoryId(value); }
    }

    const handleSubmit = (event)=>{
        // console.log('handleSubmit ', state)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("category_id", state.category_id);
        urlencoded.append("user_id", state.user_id);
        urlencoded.append("name", state.name);
        urlencoded.append("cnpj", state.cnpj);
        urlencoded.append("email", state.email);
        urlencoded.append("website", state.website);
        urlencoded.append("description", state.description);
        if(state.city_id){ urlencoded.append("city_id", state.city_id) }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost/public/api/business/add", requestOptions)
            .then(response => response.json())
            // .then(response => console.log('resp', response))
            .then(result => setMyStates(result))
            .catch(error => console.log('error', error));
    }

    const setMyStates = (result)=>{
        console.log('Setting states after success ', result)
        if(result.status === 'saved'){
            setIsSubmitted(true)
            console.log('Updated stats')
        }
    }

    const FormInputs = ()=>{
        return (
            <div>
                {categories ? <InputSelect selectedOption={selectedCategoryId} label="Categoria" name="category_id" handleChange={handleChange} options={categories}/> : ''}
                <InputText label="Nome" name="name" value={state.name} handleChange={handleChange}/>
                <InputText label="CNPJ" name="cnpj" value={state.cnpj} handleChange={handleChange}/>
                <InputText label="Email" name="email" value={state.email} handleChange={handleChange}/>
                <InputText label="Website" name="website" value={state.website} handleChange={handleChange}/>
                {uf ? <InputSelect selectedOption={selectedUfId} label="Estado" name="uf" handleChange={handleChange} options={uf}/> : ''}
                {cities ? <InputSelect selectedOption={selectedCityId} label="Cidade" name="city_id" handleChange={handleChange} options={cities}/> : ''}
                <InputText label="Endereço" name="address" value={state.address} handleChange={handleChange}/>
                <InputText label="Bairro" name="district" value={state.district} handleChange={handleChange}/>

                <div className="mt-3">
                    <label htmlFor="description">Descrição</label>
                    <textarea name="description" id="description" className="form-control" onChange={handleChange} value={state.description ?? ''} />
                </div>

                <button onClick={handleSubmit} className="btn btn-primary mt-3">SALVAR</button>
            </div>
        )
    }

    if(props.userBusiness && !props.userBusiness.id){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-8 pt-5 offset-md-2">
                        <h2>Cadastre sua empresa</h2>
                        {(!isSubmitted) ? <FormInputs/> : <p>Sua empresa foi cadastrada com sucesso!</p>}

                    </div>
                </div>
            </div>
        )
    }else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-8 pt-5 offset-md-2">
                        <h2>Cadastre sua empresa</h2>
                        <p>Você já tem uma empresa cadastrada.</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default BusinessRegister;