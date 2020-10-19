import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import Column from '../Column';
import Loading from '../Loading';

const BusinessDetail = () => {
    let {id} = useParams();
    console.log(id)
    const url = `http://localhost/public/api/business/${id}`;
    const [gid, setGid] = useState(6269);   
    const [business, setBusiness] = useState(null);    

    useEffect((url) => {
        console.log(url)
        fetch(url)
            .then(response => response.json())            
            .then(data => setBusiness(data.data))
            .then(console.log('foos ' + url))
    }, [gid]);  

    if (business) {
        console.log('done')
        return (
            <main className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-8  pt-5">
                        <h1>Business</h1>
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

export default BusinessDetail;