import React from 'react';
import Home from './Home/Home';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BusinessDetail from './Business/BusinessDetail';

const Routing = () => {
    return (
        <Router>
            <Switch>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/business-detail/:id' children={<BusinessDetail />}/>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default Routing;