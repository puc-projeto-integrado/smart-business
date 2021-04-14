import React, {useContext} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { BaseContext } from './ContextProviders/BaseContextProvider';
import {CommonCredentials, CommonFunctions} from "./Common";
import Home from './Home/Home';
import Favorites from './User/Favorites';
import Login from './Login';
import BusinessDetail from './Business/BusinessDetail';
import BusinessRegister from "./Business/BusinessRegister";
import Dashboard from "./User/Dashboard";
import Stats from "./Admin/Stats";
import Category from "./Business/Category";
import UserRegister from "./User/UserRegister";
import UserUpdate from "./User/UserUpdate";
import UserBusiness from "./User/UserBusiness";
import {ModalContextProvider} from "./ContextProviders/ModalContextProvider";
import {FormBusinessContextProvider} from "./ContextProviders/FormBusinessContextProvider";
import ManageBusiness from "./Admin/ManageBusiness/ManageBusiness";
import ManageUser from "./Admin/ManageUser/ManageUser";
import AdminViewUser from "./Admin/ManageUser/AdminViewUser";
import AdminUpdateUser from "./Admin/ManageUser/AdminUpdateUser";
import AdminViewBusiness from "./Admin/ManageBusiness/AdminViewBusiness";
import AdminUpdateBusiness from "./Admin/ManageBusiness/AdminUpdateBusiness";
import {UtilsContextProvider} from "./ContextProviders/UtilsContextProvider";
import ManageCategory from "./Admin/ManageCategory/ManageCategory";
import AdminViewCategory from "./Admin/ManageCategory/AdminViewCategory";
import AdminUpdateCategory from "./Admin/ManageCategory/AdminUpdateCategory";
import AdminAddCategory from "./Admin/ManageCategory/AdminAddCategory";
import AdminAddBusiness from "./Admin/ManageBusiness/AdminAddBusiness";
import AdminAddUser from "./Admin/ManageUser/AdminAddUser";
import ManageCity from "./Admin/ManageCity/ManageCity";
import ManageState from "./Admin/ManageState/ManageState";
import AdminViewState from "./Admin/ManageState/AdminViewState";
import AdminUpdateState from "./Admin/ManageState/AdminUpdateState";
import AdminAddState from "./Admin/ManageState/AdminAddState";

const Routing = (props) => {
    const [base] = useContext(BaseContext);
    const loginRoute = '/login';
    const isAuthenticated = CommonFunctions.isAuthenticated();
    const isAdmin = CommonFunctions.isAdmin();
    if(props.mustRedirect){ window.location=props.mustRedirect; }

    return (
        <Router>
            <Switch>
                <Route path='/login'><Login functionRefs={props.functionRefs}/></Route>
                <Route path='/logout'>{props.functionRefs.logout}</Route>
                <Route path='/business/:id'><BusinessDetail /></Route>
                <Route path='/category/:id'><ModalContextProvider><Category /></ModalContextProvider></Route>
                <Route path='/favorites'>{ isAuthenticated ? <Favorites /> : <Redirect to={loginRoute} /> }</Route>
                <Route path='/register'>{ isAuthenticated ? <FormBusinessContextProvider><BusinessRegister /></FormBusinessContextProvider> : <Redirect to={loginRoute} /> }</Route>

                {/* USER */}
                <Route path='/user/register'>{ <UserRegister /> }</Route>
                <Route path='/user/business'>{ <UserBusiness functionRefs={props.functionRefs}/> }</Route>
                <Route path='/user/update'>{ <UserUpdate functionRefs={props.functionRefs}/> }</Route>
                <Route path='/dashboard'>{ isAuthenticated ? <Dashboard userBusiness={props.userBusiness} base={base}/> : <Redirect to={loginRoute} /> }</Route>

                {/* ADMIN CATEGORY */}
                <Route path='/admin/category/add'><UtilsContextProvider>{ isAdmin ? <AdminAddCategory /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>
                <Route path='/admin/category/update/:id'><UtilsContextProvider>{ isAdmin ? <AdminUpdateCategory /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>
                <Route path='/admin/category/:id'><UtilsContextProvider>{ isAdmin ? <AdminViewCategory /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>
                <Route path='/admin/category'><UtilsContextProvider>{ isAdmin ? <ManageCategory /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>

                {/* ADMIN BUSINESS */}
                <Route path='/admin/business/add'><UtilsContextProvider>{ isAdmin ? <AdminAddBusiness /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>
                <Route path='/admin/business/update/:id'><UtilsContextProvider>{ isAdmin ? <AdminUpdateBusiness /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>
                <Route path='/admin/business/:id'><UtilsContextProvider>{ isAdmin ? <AdminViewBusiness /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>
                <Route path='/admin/business'><UtilsContextProvider>{ isAdmin ? <ManageBusiness /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>

                {/* ADMIN USER */}
                <Route path='/admin/user/add'><UtilsContextProvider>{ isAdmin ? <AdminAddUser /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>
                <Route path='/admin/user/update/:id'><UtilsContextProvider>{ isAdmin ? <AdminUpdateUser /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>
                <Route path='/admin/user/:id'><UtilsContextProvider>{ isAdmin ? <AdminViewUser /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>
                <Route path='/admin/user'><UtilsContextProvider>{ isAdmin ? <ManageUser /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>

                {/* ADMIN STATE */}
                <Route path='/admin/state/add'><UtilsContextProvider>{ isAdmin ? <AdminAddState /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>
                <Route path='/admin/state/update/:id'><UtilsContextProvider>{ isAdmin ? <AdminUpdateState /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>
                <Route path='/admin/state/:id'><UtilsContextProvider>{ isAdmin ? <AdminViewState /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>
                <Route path='/admin/state'><UtilsContextProvider>{ isAdmin ? <ManageState /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>

                {/* ADMIN CITY */}
                <Route path='/admin/city/:id'><UtilsContextProvider>{ isAdmin ? <AdminViewUser /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>
                <Route path='/admin/city'><UtilsContextProvider>{ isAdmin ? <ManageCity /> : <Redirect to={loginRoute} /> }</UtilsContextProvider></Route>

                {/* STATS */}
                <Route path='/admin/stats'>{ isAdmin ? <Stats /> : <Redirect to={loginRoute} /> }</Route>

                {/* HOME */}
                <Route path='/'><ModalContextProvider><Home /></ModalContextProvider></Route>
            </Switch>
        </Router>
    );
}
export default Routing;