import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <Box justifyContent="center" className="nav" minWidth={1080}>
      <Box
        display="flex"
        width="100%"
        maxWidth={1440}
        minWidth={1080}
        my={4}
        px={4}
        justifyContent="space-between"
      >
        <Box display="flex">
          <Box className="logo" mr={5}>
            <a id="logoAnchor" href="/">
              fundy
            </a>
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
          <Box mx={2}>
            <Link
              to="/login"
              className="nbg user"
              style={{ textDecoration: 'none' }}
            >
              로그인
            </Link>
          </Box>
          <Box mx={2}>
            <Link
              to="/regist"
              className="nbg user"
              style={{ textDecoration: 'none' }}
            >
              회원가입
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
