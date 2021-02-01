import React, {useContext} from 'react';
import Home from './Home/Home';
import Favorites from './User/Favorites';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import BusinessDetail from './Business/BusinessDetail';
import BusinessRegister from "./BusinessRegister";
import Dashboard from "./User/Dashboard";
import Category from "./Business/Category";
import { BaseContext } from './ContextProviders/BaseContextProvider';

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
                    <Category />
                </Route>

                <Route path='/favorites'>
                    { isAuthenticated ? <Favorites /> : <Redirect to={loginRoute} /> }
                </Route>

                <Route path='/register'>
                    { isAuthenticated ? <BusinessRegister /> : <Redirect to={loginRoute} /> }
                </Route>

                <Route path='/dashboard'>
                    { isAuthenticated ? <Dashboard /> : <Redirect to={loginRoute} /> }
                </Route>

                <Route path='/'>
                    <Home />
                </Route>

            </Switch>
        </Router>
    );
}

export default Routing;