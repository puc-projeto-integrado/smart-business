import React, {useState, createContext} from "react";

export const UtilsContext = createContext();

export const UtilsContextProvider = props => {

    const handleFormChange = (event, setFormState) => {
        const { name, value } = event.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    }

    const setInitialFormState = (data, setFormState)=>{
        let obj = {};
        data.forEach((item)=>Object.keys(item).forEach((key)=>obj[key]=item[key]));
        setFormState(obj)
    }

    const itemDelete = (id, bearerToken, url, callback)=>{
        console.log('Item delete...')
        let headers = new Headers();
        let urlencoded = new URLSearchParams();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Authorization", `Bearer ${bearerToken}`);
        urlencoded.append("id", id);
        console.log(urlencoded.toString())
        let requestOptions = {
            method: 'DELETE',
            headers: headers,
            body: urlencoded
        };

        fetch(url, requestOptions)
            .then(response => callback(response,id))
            .catch(error => console.log('error', error));
    }

    const getElementById = (list, id)=>{
        for(const item of list){
            if(item.id === id){ return item;}
        }
        return '';
    }

    const removeItemFromList = (list, id)=>{
        return list.filter((item)=> item.id !== id);
    }

    const listContains = (list, item)=>{
        let exists = false;
        list.forEach((listItem)=>{
            if(item.trim()===listItem.trim()){
                exists = true;
            }
        })
        return exists;
    }

    const obj = {
        listContains : listContains,
        handleFormChange : handleFormChange,
        setInitialFormState : setInitialFormState,
        itemDelete : itemDelete,
        removeItemFromList : removeItemFromList,
        getElementById : getElementById
    }

    const [functions, setFunctions] = useState(obj);

    return (
        <UtilsContext.Provider value={[functions, setFunctions]}>
            {props.children}
        </UtilsContext.Provider>
    );
};