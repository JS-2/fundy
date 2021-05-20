import React, { useState } from 'react';
import { ReactComponent as CloseMenu } from '../assets/x.svg';
import { ReactComponent as MenuIcon } from '../assets/menu.svg';

import './header.css';
import './Navbar.css';
import { Link, useHistory } from 'react-router-dom';
import {
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../common/types';
import { rootState } from '../reducers';
import { logoutSubmit } from '../api/user';

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick2 = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    closeMobileMenu();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleMypageBtn = () => {
    history.push("/mypage");
  };

  const handleAdminBtn = () => {
    history.push("/admin");
  };

  const open = Boolean(anchorEl);

  return (
    <div className="header">
      <div className="logo-nav">
        <div className="logo-container" style={{ marginRight: '40px' }}>
          <Link id="logoAnchor" to="/" onClick={closeMobileMenu}>
            fundy
          </Link>
        </div>

        <ul
          className={click ? 'nav-options active' : 'nav-options'}
          style={{ marginTop: '5px' }}
        >
          <li className="option font-smooth" onClick={closeMobileMenu}>
            <Link style={{ fontSize: '0.55em' }} className="nbg" to="/funding">
              펀딩
            </Link>
          </li>
          <li className="option font-smooth" onClick={closeMobileMenu}>
            <Link style={{ fontSize: '0.55em' }} className="nbg" to="/idol">
              아이돌
            </Link>
          </li>
          <li className="option font-smooth" onClick={closeMobileMenu}>
            <Link style={{ fontSize: '0.55em' }} className="nbg" to="/places">
              후원기관
            </Link>
          </li>
          {user === null ? (
          <>    <li className="option font-smooth rightTo" onClick={closeMobileMenu}>
          <Link style={{ fontSize: '0.55em' }} to="/login" className="nbg">
            로그인
          </Link>
        </li>
        <li className="option font-smooth " onClick={closeMobileMenu}>
          <Link style={{ fontSize: '0.55em' }} to="/regist" className="nbg">
            회원가입
          </Link>
        </li></>
        ) :(<></>)}
    
        </ul>

        {user === null ? (
          <></>
        ) : (
          <>
            <Box
              display="flex"
              className="nbg_m font-smooth"
              alignItems="center"
              style={{ fontSize: '1em', position: 'absolute', right: '60px' }}
            >
              <IconButton onClick={handleClick}>
                <Avatar
                  src={user.picture}
                  style={{ width: '45px', height: '45px' }}
                ></Avatar>
              </IconButton>
            </Box>
          </>
        )}
      </div>

      <div className="mobile-menu" onClick={handleClick2}>
        {click ? (
          <CloseMenu className="menu-icon" />
        ) : (
          <MenuIcon className="menu-icon" />
        )}
      </div>

      {user === null ? (
        <></>
      ) : (
        <Popper
          open={open}
          anchorEl={anchorEl}
          style={{ zIndex: 1, marginTop: -10 }}
        >
          <ClickAwayListener
            onClickAway={() => {
              setAnchorEl(null);
            }}
          >
            <Paper>
              <List style={{ width: 200 }}>
                <ListItem style={{ cursor: "default" }}>
                  <ListItemText
                    primary={
                      <div className="nbg_m" style={{ fontSize: "2rem" }}>
                        {user.nickname}
                      </div>
                    }
                    secondary={
                      <div className="nbg_m" style={{ fontSize: "1.2rem" }}>
                        {user.email}
                      </div>
                    }
                  ></ListItemText>
                </ListItem>
                {user.role == "ADMIN" ? (
                  <>
                    <Divider />
                    <ListItem button onClick={handleAdminBtn}>
                      <ListItemText
                        primary={
                          <div
                            className="nbg_m font-smooth"
                            style={{ fontSize: "1.6rem" }}
                          >
                            인증 관리(ADMIN)
                          </div>
                        }
                      ></ListItemText>
                    </ListItem>
                  </>
                ) : (
                  <></>
                )}

                <Divider />
                <ListItem button onClick={handleMypageBtn}>
                  <ListItemText
                    primary={
                      <div className="nbg_m font-smooth" style={{ fontSize: "1.1em" }}>
                        마이페이지
                      </div>
                    }
                  ></ListItemText>
                </ListItem>
                <Divider />
                <ListItem
                  button
                  onClick={() => {
                    logoutSubmit(dispatch);
                  }}
                >
                  <ListItemText
                    primary={
                      <div className="nbg_m font-smooth" style={{ fontSize: "1.1em" }}>
                        로그아웃
                      </div>
                    }
                  ></ListItemText>
                </ListItem>
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>
      )}
    </div>
  );
};

export default Header;
