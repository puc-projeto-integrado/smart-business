import { useEffect } from 'react';

const useGetEntity = (deps)=>{
    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${deps.bearerToken}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(deps.url, requestOptions)
            .then(response => response.json())
            .then(data => deps.setInitialFormState(data, deps.setInitData))
            .catch(error => console.log('error', error));
    }, [deps.url, deps.bearerToken]);
}

export default useGetEntity;