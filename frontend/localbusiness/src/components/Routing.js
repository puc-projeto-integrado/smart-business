import React from 'react';
import Home from './Home/Home';
import Favorites from './User/Favorites';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import BusinessDetail from './Business/BusinessDetail';

const Routing = (props) => {

    let isAuthenticated = props.isAuthenticated;
    const loginRoute = '/login';
    console.log('isAuthenticated', isAuthenticated);

    return (
        <Router>
            <Switch>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/business-detail/:id' children={<BusinessDetail />}/>
                <Route path='/favorites'>
                    { isAuthenticated ? <Favorites /> : <Redirect to={loginRoute} /> }
                </Route>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default Routing;