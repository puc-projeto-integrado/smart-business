import React, {useContext} from 'react';
import Home from './Home/Home';
import Favorites from './User/Favorites';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import BusinessDetail from './Business/BusinessDetail';
import BusinessRegister from "./Business/BusinessRegister";
import Dashboard from "./User/Dashboard";
import Stats from "./Admin/Stats";
import Category from "./Business/Category";
import { BaseContext } from './ContextProviders/BaseContextProvider';
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

const Routing = (props) => {

    const [base] = useContext(BaseContext);
    const loginRoute = '/login';
    let isAuthenticated = base.isAuthenticated();

    if(props.mustRedirect){
        window.location=props.mustRedirect;
    }

    return (
        <Router>
            {/*{ props.mustRedirect ? <Redirect to={props.mustRedirect} /> : ''}*/}
            <Switch>

                <Route path='/login'>
                    <Login functionRefs={props.functionRefs}/>
                </Route>

                <Route path='/logout'>
                    {props.functionRefs.logout}
                </Route>

                <Route path='/business/:id'>
                    <BusinessDetail />
                </Route>

                <Route path='/category/:id'>
                    <ModalContextProvider>
                        <Category />
                    </ModalContextProvider>
                </Route>

                <Route path='/favorites'>
                    { isAuthenticated ? <Favorites /> : <Redirect to={loginRoute} /> }
                </Route>

                <Route path='/register'>
                    { isAuthenticated ? <FormBusinessContextProvider><BusinessRegister /></FormBusinessContextProvider> : <Redirect to={loginRoute} /> }
                </Route>

                <Route path='/user/register'>
                    { <UserRegister /> }
                </Route>

                <Route path='/user/business'>
                    { <UserBusiness functionRefs={props.functionRefs}/> }
                </Route>

                <Route path='/user/update'>
                    { <UserUpdate functionRefs={props.functionRefs}/> }
                </Route>

                <Route path='/dashboard'>
                    { isAuthenticated ? <Dashboard /> : <Redirect to={loginRoute} /> }
                </Route>

                <Route path='/admin/stats'>
                    { (isAuthenticated && base.credentials.roleId===1) ? <Stats /> : <Redirect to={loginRoute} /> }
                </Route>
                <Route path='/admin/category/update/:id'>
                    <UtilsContextProvider>
                        { (isAuthenticated && base.credentials.roleId===1) ? <AdminUpdateCategory /> : <Redirect to={loginRoute} /> }
                    </UtilsContextProvider>
                </Route>
                <Route path='/admin/category/:id'>
                    <UtilsContextProvider>
                        { (isAuthenticated && base.credentials.roleId===1) ? <AdminViewCategory /> : <Redirect to={loginRoute} /> }
                    </UtilsContextProvider>
                </Route>

                <Route path='/admin/category/add'>
                    <UtilsContextProvider>
                        { (isAuthenticated && base.credentials.roleId===1) ? <AdminAddCategory /> : <Redirect to={loginRoute} /> }
                    </UtilsContextProvider>
                </Route>

                <Route path='/admin/category'>
                    <UtilsContextProvider>
                        { (isAuthenticated && base.credentials.roleId===1) ? <ManageCategory /> : <Redirect to={loginRoute} /> }
                    </UtilsContextProvider>
                </Route>

                <Route path='/admin/business/update/:id'>
                    <UtilsContextProvider>
                        { (isAuthenticated && base.credentials.roleId===1) ? <AdminUpdateBusiness /> : <Redirect to={loginRoute} /> }
                    </UtilsContextProvider>
                </Route>

                <Route path='/admin/business/:id'>
                    <UtilsContextProvider>
                    { (isAuthenticated && base.credentials.roleId===1) ? <AdminViewBusiness /> : <Redirect to={loginRoute} /> }
                    </UtilsContextProvider>
                </Route>

                <Route path='/admin/business'>
                    <UtilsContextProvider>
                    { (isAuthenticated && base.credentials.roleId===1) ? <ManageBusiness /> : <Redirect to={loginRoute} /> }
                    </UtilsContextProvider>
                </Route>

                <Route path='/admin/user/update/:id'>
                    <UtilsContextProvider>
                    { (isAuthenticated && base.credentials.roleId===1) ? <AdminUpdateUser /> : <Redirect to={loginRoute} /> }
                    </UtilsContextProvider>
                </Route>

                <Route path='/admin/user/:id'>
                    <UtilsContextProvider>
                    { (isAuthenticated && base.credentials.roleId===1) ? <AdminViewUser /> : <Redirect to={loginRoute} /> }
                    </UtilsContextProvider>
                </Route>

                <Route path='/admin/user'>
                    <UtilsContextProvider>
                    { (isAuthenticated && base.credentials.roleId===1) ? <ManageUser /> : <Redirect to={loginRoute} /> }
                    </UtilsContextProvider>
                </Route>

                <Route path='/'>
                    <ModalContextProvider>
                        <Home />
                    </ModalContextProvider>
                </Route>

            </Switch>
        </Router>
    );
}

export default Routing;