import React, {useState, useContext, useEffect} from "react";
import { BaseContext } from '../../ContextProviders/BaseContextProvider';
import Loading from "../../Loading";
import {useParams} from "react-router";

const AdminViewUser = ()=>{

    const [base] = useContext(BaseContext);
    const [viewData, setViewData] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${base.urls.userDetail}/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => setInitialFormState(data))
            .catch(error => console.log('error', error));
    }, [base.urls.userDetail]);

    const setInitialFormState = (data)=>{
        console.log(data)
        const formItems = { name: data[0].name, email: data[0].email, password: '' };
        setViewData(formItems)
    }

    let output;
    let urlEdit = `/admin/user/update/${id}`;
    if(viewData) {
        output = (
            <>
            <div className="mb-3">
                <label htmlFor="name"><strong>Nome:</strong></label><br/>
                {viewData.name}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="mt-3"><strong>Email:</strong></label><br/>
                {viewData.email}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="mt-3"><strong>Senha:</strong></label><br/>
                ******
            </div>
            <a href={urlEdit} className="btn btn-primary btn-block mt-3">EDITAR</a>
            </>
        );
    }else{
        output = <Loading/>
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-5">Ver Dados</h2>
                    {output}
                </div>
            </div>
        </div>
    )
}

export default AdminViewUser;