import { Box } from '@material-ui/core';
import React from 'react';
import MyFunding from '../../components/mypage/mypage/MyFunding';
import MyIdols from '../../components/mypage/mypage/MyIdols';
import Profile from '../../components/mypage/mypage/Profile';
import MyFundingPaid from '../../components/mypage/mypage/MyFundingPaid';

const Mypage = () => {
  return (
    <Box display="flex" justifyContent="center" style={{ width: '100%' }}>
      <Box style={{ width: '80%', maxWidth: '1080px' }}>
        <Profile />
        <MyFunding />
        <MyIdols />
        <MyFundingPaid></MyFundingPaid>
      </Box>
    </Box>
  );
};

export default Mypage;
