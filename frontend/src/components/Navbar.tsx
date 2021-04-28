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
