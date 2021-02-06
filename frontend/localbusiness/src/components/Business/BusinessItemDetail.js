import React from 'react';

const BusinessItemDetail = (props)=>{
    
    let business = props.business;
    
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
                <h5 className="mt-5"><em className="fa fa-globe gray-2"></em> Website</h5>
                <a href={props.business.website} title={rightCase(props.business.name)}>{props.business.website}</a>
            </div>
        );
    }

    const BlockAddress = (props)=>{
        return (
            <div>
                <h5><em className="fa fa-map-marker gray-2"></em> Endereço</h5>
                {rightCase(business.address)}
            </div>
        )
    }

    const BlockMessage = (props)=>{
        console.log(props.message)
        return (
            <div className="mt-3 alert alert-warning" role="alert">{props.message}</div>
        )
    }

    return (
        <div>
            <h6>{business.categoryName} em {business.cityName}</h6>
            <h3>{business.name}</h3>
            <p>{business.description}</p>

            <hr className="mt-4 mb-4"/>

            { business.address ? <BlockAddress business={business}/> : <BlockMessage message="Endereço não informado"/>}            
            { business.website && business.website !== ' ' ? <BlockWebsite business={business}/> : <BlockMessage message="Website não informado"/>}
            
        </div>                
    );
}

export default BusinessItemDetail;