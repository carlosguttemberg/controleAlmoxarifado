import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import Route from './Route';

// import SignIn from '../pages/SingIn';
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/employees" exact component={Employees} />
    {/* <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate /> */}
  </Switch>
);

export default Routes;
