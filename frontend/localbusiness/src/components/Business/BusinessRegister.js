import React, {useContext, useEffect, useState} from "react";
import InputText from "../Partials/InputText";
import InputSelect from "../Partials/InputSelect";
import { BaseContext } from '../ContextProviders/BaseContextProvider';
import Feedback from "../Partials/Feedback";
import {FormBusinessContext} from "../ContextProviders/FormBusinessContextProvider";

const BusinessRegister = ()=>{
    const [base] = useContext(BaseContext);
    const [formContext, setFormContext] = useContext(FormBusinessContext);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [uf, setUf] = useState(null);
    const [cities, setCities] = useState(null);
    const [selectedUfId, setSelectedUfId] = useState('');
    const [selectedCityId, setSelectedCityId] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    var requestOptions = { method: 'GET', };
    const urlUf = base.urls.uf;

    useEffect(() => {

        if(!uf) {
            fetch(urlUf, requestOptions)
                .then(response => response.json())
                .then(data => setUf(data))
                .catch(error => console.log('error', error));
        }
    }, [uf, requestOptions, urlUf]);

    if(selectedUfId && !cities){
        fetch(`${base.urls.citiesByState}/${selectedUfId}`, requestOptions)
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => console.log('error', error));
    }

    const FormInputs = ()=>{
        const [state, setState] = useState(formContext);

        const handleChange = (event) => {
            const { name, value } = event.target;
            setState(prevState => ({ ...prevState, [name]: value }));
            
            if(name==='uf'){
                setCities(null)
                setSelectedUfId(value);
            }
            if(name==='city_id'){ setSelectedCityId(value);}
            if(name==='category_id'){ setSelectedCategoryId(value);}
        }

        const handleSubmit = (event)=>{

            setFormContext(state);

            let canProceed = true;
            Object.keys(state).forEach((key)=>{
                if(!state[key]){
                    canProceed = false;
                    setFeedback({active: true, message : 'Todo os campos são obrigatórios.', status:'error'});
                }
            })

            if(!selectedCategoryId || !selectedCityId){
                canProceed = false;
                setFeedback({active: true, message : 'Todo os campos são obrigatórios', status:'error'});
            }

            if(canProceed) {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                var urlencoded = new URLSearchParams();
                urlencoded.append("user_id", base.credentials.userId);
                urlencoded.append("name", state.name);
                urlencoded.append("cnpj", state.cnpj);
                urlencoded.append("email", state.email);
                urlencoded.append("website", state.website);
                urlencoded.append("address", state.address);
                urlencoded.append("district", state.district);
                urlencoded.append("description", state.description);
                urlencoded.append("city_id", selectedCityId)
                urlencoded.append("category_id", selectedCategoryId);

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: urlencoded
                };

                fetch(base.urls.businessAdd, requestOptions)
                    .then(response => response.json())
                    .then(result => setMyStates(result))
                    .catch(error => console.log('error', error));
            }
        }

        const setMyStates = (result)=>{
            if(result.status!==200){
                setFeedback({active: true, message : 'Houve um erro.', status:'error'});
            }else{
                setFeedback({active: true, message : 'Empresa cadastrada com sucesso!', status:'success'});
                setIsSubmitted(true)
            }
        }

        return (
            <div>
                {base.categories ? <InputSelect selectedOption={selectedCategoryId} label="Categoria" name="category_id" handleChange={handleChange} options={base.categories}/> : ''}
                {uf ? <InputSelect selectedOption={selectedUfId} label="Estado" name="uf" handleChange={handleChange} options={uf}/> : ''}
                {cities ? <InputSelect selectedOption={selectedCityId} label="Cidade" name="city_id" handleChange={handleChange} options={cities}/> : ''}

                <InputText label="Nome" name="name" value={state.name} handleChange={handleChange}/>
                <InputText label="CNPJ" name="cnpj" value={state.cnpj} handleChange={handleChange}/>
                <InputText label="Email" name="email" value={state.email} handleChange={handleChange}/>
                <InputText label="Website" name="website" value={state.website} handleChange={handleChange}/>
                <InputText label="Endereço" name="address" value={state.address} handleChange={handleChange}/>
                <InputText label="Bairro" name="district" value={state.district} handleChange={handleChange}/>

                <div className="mt-3 mb-3">
                    <label htmlFor="description">Descrição</label>
                    <textarea name="description" id="description" className="form-control" onChange={handleChange} value={state.description ?? ''} />
                </div>
                <Feedback params={feedback} />
                <button type="button" onClick={handleSubmit} className="btn btn-primary mt-3">SALVAR</button>
            </div>
        )
    }

    if(base.userBusiness===null){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-8 pt-5 offset-md-2">
                        <h2>Cadastre sua empresa</h2>
                        <Feedback params={feedback}/>
                        {(!isSubmitted) ? <FormInputs/> : <></>}
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