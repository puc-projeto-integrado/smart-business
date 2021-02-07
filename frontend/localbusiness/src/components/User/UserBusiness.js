import React, {useContext, useEffect, useState} from "react";
import Column from "../Column";
import Loading from "../Loading";
import {BaseContext} from "../ContextProviders/BaseContextProvider";
import BusinessItemDetail from "../Business/BusinessItemDetail";
import Feedback from "../Partials/Feedback";

const UserBusiness = (props)=>{

    const [base] = useContext(BaseContext);
    const [business, setBusiness] = useState('loading');
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});

    useEffect(() => {
        if(base.urls) {
            //console.log(base)

            let businessHeaders = new Headers();
            businessHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            businessHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);

            let requestOptions = {
                method: 'GET',
                headers: businessHeaders,
            };

            fetch(base.urls.businessByUser, requestOptions)
                .then(response => response.status !== 200 ? null : response.json())
                .then(data => setBusiness(data))
                .catch(error => console.log('error', error));
        }
    }, [base]);

    const removeBusiness = ()=>{
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);

            var urlencoded = new URLSearchParams();
            urlencoded.append("user_id", base.credentials.userId);
            urlencoded.append("business_id", business.id);

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: urlencoded,
            };
            console.log(requestOptions.body)
            fetch(base.urls.businessDelete, requestOptions)
                .then(response => response.json())
                .then(response => removeBusinnessPost(response))
                .catch(error => console.log('error', error));
    }

    const removeBusinnessPost = (response)=>{

        if(response.status!==200){
            setFeedback({active: true, message : 'Houve um erro ao excluir sua empresa.', status:'error'});
        }else{
            console.log('Done! ', response)
            setFeedback({active: true, message : 'Empresa excluída com sucesso!', status:'success'});
            setBusiness(null);
        }
    }    

    if (business==='loading') {
        return (
            <main className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-8  pt-5">
                        <Loading />
                    </div>
                    <div className="col-4 d-none d-sm-block pt-5">
                        <Column />
                    </div>
                </div>
            </main>
        )

    } else if (business) {

        let propsObj = {
            categoryName : business.category_name,
            cityName : business.city_name,
            name : business.name,
            description : business.description,
            address : business.address,
            website : business.website,
        }

        return (
            <main className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-8 pt-5">
                        <h2 className="mb-5">Sua Empresa</h2>
                        <Feedback params={feedback}/>
                        <BusinessItemDetail business={propsObj}/>
                        <div className="mt-5">
                            <button type="button" onClick={removeBusiness} className="btn btn-danger ml-3"><em className="fa fa-times"></em> Remover Empresa</button>
                        </div>
                    </div>
                    <div className="col-4 d-none d-sm-block pt-5">
                        <Column />
                    </div>
                </div>
            </main>
        )
    }else{
        return (
            <main className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-8 pt-5">
                        <h2 className="mb-5">Sua Empresa</h2>
                        <Feedback params={feedback}/>
                        <p>Nenhuma empresa cadastrada no momento.</p>
                    </div>
                    <div className="col-4 d-none d-sm-block pt-5">
                        <Column />
                    </div>
                </div>
            </main>
        )
    }
}

export default UserBusiness;