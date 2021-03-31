import React, {useContext, useEffect, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import Loading from "../../Loading";
import TableActions from "../../Partials/TableActions";
import MasterTable from "../../Partials/MasterTable";

const ManageUser = ()=>{

    const [base] = useContext(BaseContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(base.urls.userList, requestOptions)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.log('error', error));
    }, [base.urls.userList]);

    const userDelete = (id)=>{
        console.log('delete user')
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${base.credentials.accessToken}`);

        let urlencoded = new URLSearchParams();
        urlencoded.append("id", id);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: urlencoded
        };
        fetch(base.urls.userDelete, requestOptions)
            // .then(response => response.json())
            .then(response => console.log('RESPONSE', response))
            // .then(data => console.log(data))
            .catch(error => console.log('error', error));
    }

    if(user) {
        let tableLabels = ['NOME', 'EMAIL', 'AÇÕES'];
        let rows = user.map((item) => {
            return (
                <tr key={item.id}>
                    <td width="24%">{item.name}</td>
                    <td width="24%">{item.email}</td>
                    <td width="14%">
                            <TableActions
                                id={item.id}
                                view="/admin/user/"
                                edit="/admin/user/update/"
                                delete={userDelete}/>
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
                            <MasterTable labels={tableLabels} rows={rows}/>
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