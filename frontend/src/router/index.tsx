import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Funding from '../pages/Funding';

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/funding" component={Funding} exact />
        <Route path="/" component={Main} exact/>
        <Redirect from="*" to="/"/>
      </Switch>
    </Router>
  );
};

export default index;
