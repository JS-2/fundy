import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Create from '../pages/funding/Create';
const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/funding/create" component={Create} exact />
      </Switch>
    </Router>
  );
};

export default index;
