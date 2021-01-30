import {read_cookie} from "sfcookies";

export const isAuthenticated = () => {
    const credentials = read_cookie('credentials');
    // console.log('credentials', credentials)
    if(typeof credentials === 'undefined' || credentials.length === 0){
        return false;
    }
    return true;
};

