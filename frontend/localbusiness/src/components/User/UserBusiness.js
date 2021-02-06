import React, {useContext, useEffect, useState} from "react";
import Column from "../Column";
import Loading from "../Loading";
import {BaseContext} from "../ContextProviders/BaseContextProvider";
import BusinessItemDetail from "../Business/BusinessItemDetail";

const UserBusiness = (props)=>{

    const [base] = useContext(BaseContext);
    const [business, setBusiness] = useState(null);

    useEffect(() => {
        if(base.urls) {

            let businessHeaders = new Headers();
            businessHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            businessHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);

            let requestOptions = {
                method: 'GET',
                headers: businessHeaders,
            };

            fetch(base.urls.businessByUser, requestOptions)
                .then(response => response.json())
                .then(data => fetchBusinessPost(data))
        }
    }, [base]);

    const fetchBusinessPost = (data)=>{
        if(data){
            setBusiness(data)
        }
    }

    const removeBusiness = ()=>{
            console.log('Removing...')
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);

            var urlencoded = new URLSearchParams();
            urlencoded.append("user_id", base.credentials.userId);
            urlencoded.append("business_id", business.id);

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch(base.urls.businessDelete, requestOptions)
                .then(response => response.json())
                .then(data => removeBusinnessPost(data))
                .catch(error => console.log('error', error));
    }

    const removeBusinnessPost = (data)=>{
        console.log(data)
        props.functionRefs.redirect('/dashboard');
    }    

    if (business) {
        
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

    } else {
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
    }
}

export default UserBusiness;