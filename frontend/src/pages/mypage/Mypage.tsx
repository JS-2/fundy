import React from 'react';
import MyFunding from '../../components/mypage/mypage/MyFunding';
import MyIdols from '../../components/mypage/mypage/MyIdols';
import Profile from '../../components/mypage/mypage/Profile';

const Mypage = () => {
  return (
    <div>
      <Profile />
      <MyFunding />
      <MyIdols />
    </div>
  );
};

export default Mypage;
