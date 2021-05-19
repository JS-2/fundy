import { Box } from '@material-ui/core';
import React from 'react';
import MyFunding from '../../components/mypage/mypage/MyFunding';
import MyIdols from '../../components/mypage/mypage/MyIdols';
import Profile from '../../components/mypage/mypage/Profile';

const Mypage = () => {
  return (
    <Box display="flex" justifyContent="center" style={{ width: '100%' }}>
      <Box style={{ width: '60%', minWidth: '700px', minHeight: '720px' }}>
        <Profile />
        <MyFunding />
        <MyIdols />
      </Box>
    </Box>
  );
};

export default Mypage;
