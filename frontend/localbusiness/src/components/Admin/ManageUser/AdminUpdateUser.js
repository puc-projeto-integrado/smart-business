import React, {useContext, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import {useParams} from "react-router";
import Feedback from "../../Partials/Feedback";
import Loading from "../../Loading";
import useGetEntity from "../../Hooks/useGetEntity";

const AdminUpdateUser = ()=>{

    const [base] = useContext(BaseContext);
    const [utils] = useContext(UtilsContext);
    const [dataUpdated, setDataUpdated] = useState(false);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const [formState, setFormState] = useState(null);
    const {id} = useParams();
    const labels = { name : 'Nome', email : 'Email' };
    const exceptions = ['password']
    const bearerToken = base.credentials.accessToken;
    const deps = {
        bearerToken : base.credentials.accessToken,
        url : `${base.urls.userDetail}/${id}`,
        setInitialFormState : utils.setInitialFormState,
        setInitData : setFormState,
    }
    let output = <Loading/>;

    useGetEntity(deps);

    const setMyStates = (result)=>{
        if(result.status!==200){
            setFeedback({active: true, message : 'Houve um erro na atualização dos dados.', status:'error'});
        }else{
            setFeedback({active: true, message : 'Dados atualizadps com sucesso!', status:'success'});
            setDataUpdated(true);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    }

    const params = {
        url : base.urls.userUpdate,
        labels : labels,
        exceptions : exceptions,
        formState : formState,
        setFeedback :setFeedback,
        bearerToken : bearerToken,
        id : id,
        setMyStates : setMyStates
    }

    if(formState && !dataUpdated){
        output = (
            <>
                <Feedback params={feedback}/>
                <label htmlFor="name">Nome:</label>
                <input type="text" name="name" className="form-control" value={formState.name} onChange={handleChange}/>
                <label htmlFor="email" className="mt-3">Email:</label>
                <input required={true} type="email" name="email" className="form-control" value={formState.email} onChange={handleChange}/>
                <label htmlFor="password" className="mt-3">Senha:</label>
                <input required={true} type="password" name="password" className="form-control" value={formState.password} onChange={handleChange}/>
                <small>[Opcional] Deixe em branco para não alterar a senha.</small>
                <button onClick={(e)=>utils.handleSubmit(e, params)} type="submit" className="btn btn-primary btn-block mt-3">SALVAR</button>
            </>
        );
    }else if(formState && dataUpdated){
        output = <Feedback params={feedback}/>
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-5">Editar Dados</h2>
                    {output}
                </div>
            </div>
        </div>
    )
}

export default AdminUpdateUser;