import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import Route from './Route';

// import SignIn from '../pages/SingIn';
// import SignUp from '../pages/SingUp';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard}></Route>
    {/* <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate /> */}
  </Switch>
);

export default Routes;
