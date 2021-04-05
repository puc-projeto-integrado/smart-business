import React, {useContext, useEffect, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import Loading from "../../Loading";
import TableActions from "../../Partials/TableActions";
import MasterTable from "../../Partials/MasterTable";
import Feedback from "../../Partials/Feedback";

const ManageUser = ()=>{
    const [base] = useContext(BaseContext);
    const [utils] = useContext(UtilsContext);
    const [user, setUser] = useState(null);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const bearerToken = base.credentials.accessToken;

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${bearerToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(base.urls.userList, requestOptions)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.log('error', error));
    }, [base.urls.userList, bearerToken]);

    const processItemDelete = (response, id)=>{
        let updatedList = utils.removeItemFromList(user, id);
        setUser(updatedList);
        setFeedback({active: true, message : 'Item removido com sucesso!', status:'success'});
    }

    if(user) {
        let tableLabels = [
            ['NOME',40],
            ['EMAIL',40],
            ['AÇÕES',20]
        ];

        let rows = user.map((item) => {
            return (
                <tr key={item.id}>
                    <td width="24%">{item.name}</td>
                    <td width="24%">{item.email}</td>
                            <TableActions
                                id={item.id}
                                view="/admin/user/"
                                edit="/admin/user/update/"
                                itemDeleteCallback={utils.itemDelete}
                                processItemDeleteCallback={processItemDelete}
                                urlItemDelete={base.urls.userDelete}
                                bearerToken={bearerToken}
                            />
                </tr>
            )
        })

        return (
            <main className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-12  pt-5">
                        <h2>Gerenciar Usuários</h2>
                        <Feedback params={feedback}/>
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