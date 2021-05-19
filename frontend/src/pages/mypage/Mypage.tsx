import React from 'react';
import MyFunding from '../../components/mypage/mypage/MyFunding';
import MyIdols from '../../components/mypage/mypage/MyIdols';
import Profile from '../../components/mypage/mypage/Profile';
import MyFundingPaid from '../../components/mypage/mypage/MyFundingPaid';

const Mypage = () => {
  return (
    <div>
      <div className="col-md-1"></div>
      <div className="col-md-10">
      <Profile />
      <MyFunding />
      <MyFundingPaid></MyFundingPaid>
      <MyIdols />

      </div>
    </div>
  );
};

export default Mypage;
