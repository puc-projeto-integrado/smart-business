import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Foo from "./Foo";

const Routing = React.memo(props => {
    if(props.mustRedirect){ window.location=props.mustRedirect; }

    return (
        <Router>
            <Switch>
                <Route path='/foo'><Foo/></Route>
            </Switch>
        </Router>
    );
});
export default Routing;