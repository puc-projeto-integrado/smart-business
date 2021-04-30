import React, {useContext, useState} from "react";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import {CommonUrls, CommonCredentials} from "../../Common";
import {useParams} from "react-router";
import Feedback from "../../Partials/Feedback";
import Loading from "../../Loading";

const AdminAddUser = ()=>{
    const [utils] = useContext(UtilsContext);
    const [dataCreated, setDataCreated] = useState(false);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const [formState, setFormState] = useState({name:''});
    const {id} = useParams();
    const bearerToken = CommonCredentials.accessToken;
    const exceptions = ['created_at', 'updated_at'];
    const labels = { name : 'Nome', email : 'Email'};
    let rows;
    let output = <Loading/>;

    const setMyStates = (result)=>{
        if(result.status!==200){
            setFeedback({active: true, message : 'Houve um erro na atualização dos dados.', status:'error'});
        }else{
            window.scrollTo(0, 0);
            setFeedback({active: true, message : 'Registro criado com sucesso!', status:'success'});
            setDataCreated(true);
        }
    }

    if(labels){
        rows = Object.keys(labels).map((key)=>{
            if(labels[key]){
                return (
                    <div className="mb-3" key={key}>
                        <label htmlFor="name"><strong>{labels[key]}:</strong></label><br/>
                        <input type="text" name={key} className="form-control" value={formState[key]} onChange={(e)=>utils.handleFormChange(e, setFormState)}/>
                    </div>
                )
            }else{
                return '';
            }
        })

        if(!dataCreated){
            const params = {
                url : CommonUrls.categoryAdd,
                labels : labels,
                exceptions : exceptions,
                formState : formState,
                setFeedback :setFeedback,
                bearerToken : bearerToken,
                id : id,
                setMyStates : setMyStates
            }

            output = (
                <>
                    {rows}
                    <button onClick={(e)=>utils.handleSubmit(e, params)} type="submit" className="btn btn-primary btn-block mt-3">SALVAR</button>
                </>
            );
        }else{
            output = '';
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-5">NOVO USUÁRIO</h2>
                    <Feedback params={feedback}/>
                    {output}
                </div>
            </div>
        </div>
    )
}

export default AdminAddUser;