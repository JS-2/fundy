import { Box } from '@material-ui/core';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Login from '../pages/Login';
import Regist from '../pages/Regist';

const index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Box minWidth={1080} display="flex" justifyContent="center">
        <Box width={1080}>
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/regist" component={Regist} exact />
          </Switch>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default index;
