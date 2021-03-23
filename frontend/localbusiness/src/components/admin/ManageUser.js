import React, {useContext, useEffect, useState} from "react";
import {BaseContext} from "../ContextProviders/BaseContextProvider";
import Loading from "../Loading";

const ManageUser = ()=>{

    const [base] = useContext(BaseContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNlNjMwODMzNDlmOWE5NWQ5OTk5MTFhNzY4ZDAyNGY4YTBiZDEyYWY0YjVkNDk5ZDhmMGY0NThkM2NhZDY2ZDU2YjFkNTM2ZDQ2MGZkODE5In0.eyJhdWQiOiI1IiwianRpIjoiY2U2MzA4MzM0OWY5YTk1ZDk5OTkxMWE3NjhkMDI0ZjhhMGJkMTJhZjRiNWQ0OTlkOGYwZjQ1OGQzY2FkNjZkNTZiMWQ1MzZkNDYwZmQ4MTkiLCJpYXQiOjE2MTI2NDg2MjQsIm5iZiI6MTYxMjY0ODYyNCwiZXhwIjoxNjQ0MTg0NjI0LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.NndK3gkApTELBhb2A9b8cjp0POwCUD6gDujIka9TDLGIoh3sNuhXzloyDtVScci__eclGJj6IRLZHWSf5cHwe7Ydfxa5y4gPYXMZi2bzXI8b2wm6UmvlHkjORwDAMlHHoScp1fnhyktsx8QovW4wMJAYgFUCH7wZkaTxTme9cROExicTd9O1jmFy9_2T-gthQOTQ6Hiq1bLsJ4W0Uygym0uihjdoraRfpNc_MQH-mtOubJePg44gYzizjIdtXuVCxdaWn475fxaj4ZcFO7Veki-_5xFPQpDmGhYo5febPuoJ4IIWZA6WiB9Q9RiF4CTTkfH41pRQJsS5br_99xhGTi9FhShNeo3SaYP6EarMm3ttHcFQbEPBSNEMa3XNkVH7ycqWAE5jAZZhsB3YBG7oN2r1tyiepS2WxZmcjt4OX-JwnqSHXRA58Gi4ZaVamhF3vTf_3zKyDBalzZVrZfbGjujbpNVPxHhOubSuxa5NO732NEpYJGkF2-fwTm-CB50jO5qbmRkr73wBGR4wuOXzrLR6ltIqdWSo7YOczRO_P1mZgMQVC4deG7fuVbne73fOz9z-V8dHEt36xRlx0U9AdPtoI9FPDT9GwBHREUcsj2RIAHd5GEArGPUNT96hYP0YlsTjgIf_4LyXHGllvGAnivdve6cgLaGBWLwUUQZJ4Ww");

        var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(base.urls.userList, requestOptions)
            .then(response => response.text())
            .then(data => console.log(data))
            //.then(data => setUser(data))
            .catch(error => console.log('error', error));

        // fetch(base.urls.userList, requestOptions)
        //     .then(response => response.json())
        //     .then(data => setUser(data))
    }, [base.urls.userList]);

    if(user) {
        console.log(user)
        let rows = user.data.map((item) => {
            return (
                <tr key={item.id}>
                    <td width="50%">{item.name}</td>
                    <td width="20%">{item.email}</td>
                    <td width="10%">
                        <em className="fa fa-eye ml-2"></em>
                        <em className="fa fa-edit ml-2"></em>
                        <em className="fa fa-trash ml-2"></em>
                    </td>
                </tr>
            )
        })

        return (
            <main className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-12  pt-5">
                        <h2>Gerenciar Usuários</h2>
                        <div className="table-responsive">
                            <table className="table mt-5">
                                <thead>
                                <tr>
                                    <td>NOME</td>
                                    <td>EMAIL</td>
                                    <td>AÇÕES</td>
                                </tr>
                                </thead>

                                <tbody>

                                {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        )

    }else{
        return <Loading/>
    }
}

export default ManageUser;