import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} exact />
      </Switch>
    </Router>
  );
};

export default index;
