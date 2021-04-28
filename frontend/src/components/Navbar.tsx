import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import './navbar.css';

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
          <a id="logoAnchor" href="/">fundy</a>
          </Box>
          <Box mx={3} className="nbg">
            <a href="/funding">펀딩</a>
          </Box>
          <Box mx={3} className="nbg">
          <a href="/idol">아이돌</a>
          </Box>
          <Box mx={3} className="nbg">
          <a href="/store">스토어</a>
          </Box>
        </Box>
        <Box display="flex">
          <Box mx={2} className="nbg user">
          <a href="/login">로그인</a>
          </Box>
          <Box mx={2} className="nbg user">
          <a href="/register">회원가입</a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
