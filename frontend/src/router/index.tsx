import { Box } from '@material-ui/core';
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Login from '../pages/member/Login';
import Regist from '../pages/member/Regist';
import Mypage from '../pages/mypage/Mypage';
import Main from '../pages/Main';
import Funding from '../pages/Funding';
import FundingDetail from '../pages/funding/FundingDetail';
import FundCreate from '../pages/funding/FundCreate';
import { Create } from '@material-ui/icons';
import MyFunding from '../pages/mypage/MyFunding';
import IdolList from '../pages/idol/IdolList';
import IdolDetail from '../pages/idol/IdolDetail';
import FundPayment from '../pages/funding/FundPayment';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import CertManage from '../pages/admin/Admin';
import Admin from '../pages/admin/Admin';
import Places from '../pages/Places';

const index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Box display="flex" justifyContent="center">
        <div className="mainArea col-md-12">
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/regist" component={Regist} exact />
            <Route path="/mypage" component={Mypage} exact />
            <Route path="/mypage/:funding_id" component={MyFunding} exact />
            <Route path="/funding" component={Funding} exact />
            <Route
              path="/funding/detail/:num"
              component={FundingDetail}
              exact
            />
            <Route
              path="/funding/detail/:num/payment"
              component={FundPayment}
              exact
            />
            <Route path="/funding/create" component={FundCreate} exact />
            <Route path="/idol" component={IdolList} exact />
            <Route path="/idol/:idol_id" component={IdolDetail} exact />
            <Route path="/" component={Main} exact />
            <Route path="/admin" component={Admin} exact />
            <Route path="/places" component={Places} exact />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Box>
      <Footer />
    </BrowserRouter>
  );
};

export default index;
