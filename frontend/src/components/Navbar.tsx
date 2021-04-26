import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import '../css/navbar.css';

const Navbar = () => {
  return (
    <Box justifyContent="center" className="nav" minWidth={1080}>
      <Box
        display="flex"
        width="100%"
        maxWidth={1440}
        minWidth={1080}
        justifyContent="space-between"
      >
        <Box display="flex">
          <Box className="logo" ml={3} mr={5}>
            fundy
          </Box>
          <Box mx={3} className="nbg">
            펀딩
          </Box>
          <Box mx={3} className="nbg">
            아이돌
          </Box>
          <Box mx={3} className="nbg">
            스토어
          </Box>
        </Box>
        <Box display="flex">
          <Box mx={2} className="nbg user">
            로그인
          </Box>
          <Box mx={2} className="nbg user">
            회원가입
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
