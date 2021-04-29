import { Box } from '@material-ui/core';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Login from '../pages/member/Login';
import Regist from '../pages/member/Regist';
import Mypage from '../pages/mypage/Mypage';

const index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Box minWidth={720} display="flex" justifyContent="center">
        <Box width={720} px={4}>
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/regist" component={Regist} exact />
            <Route path="/mypage" component={Mypage} exact />
          </Switch>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default index;
