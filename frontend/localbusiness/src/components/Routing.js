import React from 'react';
import Home from './Home/Home';
import Favorites from './User/Favorites';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import BusinessDetail from './Business/BusinessDetail';
import BusinessRegister from "./BusinessRegister";
import Dashboard from "./User/Dashboard";

const Routing = (props) => {

    let isAuthenticated = props.isAuthenticated;
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

                <Route path='/business-detail/:id' children={<BusinessDetail />}/>

                <Route path='/favorites'>
                    { isAuthenticated ? <Favorites /> : <Redirect to={loginRoute} /> }
                </Route>

                <Route path='/register'>
                    { isAuthenticated ? <BusinessRegister userBusiness={props.userBusiness} /> : <Redirect to={loginRoute} /> }
                </Route>

                <Route path='/dashboard'>
                    { isAuthenticated ? <Dashboard userBusiness={props.userBusiness}/> : <Redirect to={loginRoute} /> }
                </Route>

                <Route path='/'>
                    <Home />
                </Route>

            </Switch>
        </Router>
    );
}

export default Routing;