import {read_cookie} from "sfcookies";
const cookie = read_cookie('credentials');
const baseUrlApiDev = 'http://localhost/public/api';
const baseUrlApiProd = 'http://puc-api.gabrielguerra.me/api';
const baseUrlApi = (process.env.NODE_ENV) === 'development' ? baseUrlApiDev : baseUrlApiProd;

const credentials = {
    userId : cookie.id,
    accessToken : cookie.access_token,
    roleId : cookie.roleId
};

const sortAlphabetically = (array)=> {
    array.sort(function (a, b) {
        if (a.name < b.name) { return -1;}
        if (a.name > b.name) { return 1;}
        return 0;
    })
    return array;
}

const isAuthenticated = ()=> (typeof cookie === 'undefined' || cookie.length === 0) ? false : true;
const isAdmin = ()=> isAuthenticated() && credentials.roleId===1;

export const CommonFunctions = {
    sortAlphabetically : sortAlphabetically,
    isAuthenticated : isAuthenticated,
    isAdmin : isAdmin
}
export const CommonCredentials = credentials;
export const CommonUrls = {
            login: `${baseUrlApi}/login`,
            adminUserUpdate: `${baseUrlApi}/admin/user/update`,
            userRegister: `${baseUrlApi}/user/add`,
            userList: `${baseUrlApi}/user`,
            userDetail: `${baseUrlApi}/user`,
            userUpdate: `${baseUrlApi}/user/update`,
            userDelete: `${baseUrlApi}/user/delete`,
            category: `${baseUrlApi}/category`,
            categoryDelete: `${baseUrlApi}/category/delete`,
            categoryDetail: `${baseUrlApi}/category`,
            categoryUpdate: `${baseUrlApi}/category/update`,
            categoryAdd: `${baseUrlApi}/category/add`,
            favorites: `${baseUrlApi}/favorites/${credentials.userId}`,
            favoritesDelete: `${baseUrlApi}/favorites/delete`,
            favoritesAdd: `${baseUrlApi}/favorites/add`,
            uf: `${baseUrlApi}/state`,
            citiesByState: `${baseUrlApi}/city/state`,
            business: `${baseUrlApi}/business`,
            businessHighlight: `${baseUrlApi}/business/highlight`,
            businessByUser: `${baseUrlApi}/business/user/${credentials.userId}`,
            businessCategory: `${baseUrlApi}/business/category`,
            businessDelete: `${baseUrlApi}/business/delete`,
            businessAdd: `${baseUrlApi}/business/add`,
            businessDetail: `${baseUrlApi}/business`,
            businessUpdate: `${baseUrlApi}/business/update`,
            statsByCategory: `${baseUrlApi}/stats/category`,
            statsByState: `${baseUrlApi}/stats/state`,
            statsByCity: `${baseUrlApi}/stats/city`,
            statsByFavorite: `${baseUrlApi}/stats/favorite`,
            statsByRegister: `${baseUrlApi}/stats/register`,
        };