import React, {useContext} from 'react';
import Home from './Home/Home';
import Favorites from './User/Favorites';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import BusinessDetail from './Business/BusinessDetail';
import BusinessRegister from "./Business/BusinessRegister";
import Dashboard from "./User/Dashboard";
import Stats from "./admin/Stats";
import Category from "./Business/Category";
import { BaseContext } from './ContextProviders/BaseContextProvider';
import UserRegister from "./User/UserRegister";
import UserUpdate from "./User/UserUpdate";
import UserBusiness from "./User/UserBusiness";
import {ModalContextProvider} from "./ContextProviders/ModalContextProvider";
import {FormBusinessContextProvider} from "./ContextProviders/FormBusinessContextProvider";
import ManageBusiness from "./admin/ManageBusiness/ManageBusiness";
import ManageUser from "./admin/ManageUser/ManageUser";
import AdminViewUser from "./admin/ManageUser/AdminViewUser";
import AdminUpdateUser from "./admin/ManageUser/AdminUpdateUser";

const Routing = (props) => {

    const [base] = useContext(BaseContext);
    let isAuthenticated = base.isAuthenticated();
    const loginRoute = '/login';
    
    return (
        <Router>
            { props.mustRedirect ? <Redirect to={props.mustRedirect} /> : ''}
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

                <Route path='/admin/business'>
                    { (isAuthenticated && base.credentials.roleId===1) ? <ManageBusiness /> : <Redirect to={loginRoute} /> }
                </Route>

                <Route path='/admin/user/update/:id'>
                    { (isAuthenticated && base.credentials.roleId===1) ? <AdminUpdateUser /> : <Redirect to={loginRoute} /> }
                </Route>

                <Route path='/admin/user/:id'>
                    { (isAuthenticated && base.credentials.roleId===1) ? <AdminViewUser /> : <Redirect to={loginRoute} /> }
                </Route>

                <Route path='/admin/user'>
                    { (isAuthenticated && base.credentials.roleId===1) ? <ManageUser /> : <Redirect to={loginRoute} /> }
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