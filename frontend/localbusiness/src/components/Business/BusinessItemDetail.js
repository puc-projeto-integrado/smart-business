import React from 'react';

const BusinessItemDetail = (props)=>{
    
    let business = props.business;
    // console.log(business);

    const rightCase = (str)=>{

        let words = str.split(" ");
        let final = '';

        words.forEach((item)=>{
            if(item.toUpperCase()==='DE' || item.toUpperCase()==='DA' || item.toUpperCase()==='DO'){
                final += 'de '
            }else{
                let tmp = item.toLowerCase();
                final += tmp.charAt(0).toUpperCase() + tmp.slice(1) + ' ';
            }
        })

        return final;
    }

    const BlockWebsite = (props)=>{
        return (
            <div>
                <h6 className=""><em className="fa fa-globe gray-2"></em> <a href={props.business.website} title={rightCase(props.business.name)}>{props.business.website}</a></h6>
            </div>
        );
    }

    const BlockAddress = (props)=>{
        return (
            <div>
                <h6><em className="fa fa-map-marker gray-2"></em> {rightCase(business.address)} | {business.cityName}</h6>

            </div>
        )
    }

    const BlockMessage = (props)=>{
        return (
            <div className="mt-3 alert alert-warning" role="alert">{props.message}</div>
        )
    }

    const BlockPhone = (props)=>{
        return (
            <div>
                <h6 className="mt-3"><em className="fa fa-phone gray-2"></em> {rightCase(business.phone)}</h6>
            </div>
        )
    }

    return (
        <div>
            <h4><span className="badge badge-primary">{business.categoryName} em {business.cityName}</span></h4>
            <h3 className="mt-4">{business.name}</h3>
            <p>{business.description}</p>

            <hr className="mt-4 mb-4"/>
            { business.phone ? <BlockPhone business={business}/> : <BlockMessage message="Telefone não informado"/>}
            { business.address ? <BlockAddress business={business}/> : <BlockMessage message="Endereço não informado"/>}            
            { business.website && business.website !== ' ' ? <BlockWebsite business={business}/> : <BlockMessage message="Website não informado"/>}
            
        </div>                
    );
}

export default BusinessItemDetail;