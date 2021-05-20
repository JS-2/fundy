import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popper,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { logoutSubmit } from '../api/user';
import { User } from '../common/types';
import { rootState } from '../reducers';
import './Navbar.css';

const Navbar = () => {
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleMypageBtn = () => {
    history.push('/mypage');
  };

  const handleAdminBtn = () => {
    history.push('/admin');
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box justifyContent="center" className="nav" minWidth={480}>
        <Box
          display="flex"
          minWidth={480}
          height={80}
          mb={1}
          mx={3}
          style={{ marginLeft: '32px' }}
          justifyContent="space-between"
          alignItems="center"
          alignContent="center"
        >
          <Box
            display="flex"
            height={80}
            alignItems="center"
            alignContent="center"
          >
            <Box className="logo" mr={5}>
              <Link id="logoAnchor" to="/">
                fundy
              </Link>
            </Box>
            <Box className="font-smooth" mx={3}>
              <Link className="nbg" to="/funding">
                펀딩
              </Link>
            </Box>
            <Box className="font-smooth" mx={3}>
              <Link className="nbg" to="/idol">
                아이돌
              </Link>
            </Box>
            <Box className="font-smooth" mx={3}>
              <Link className="nbg" to="/places">
                후원기관
              </Link>
            </Box>
          </Box>
          <Box display="flex">
            {user === null ? (
              <>
                <Box className="font-smooth" fontSize="1.1em" mx={2}>
                  <Link
                    to="/login"
                    className="nbg user"
                    style={{ textDecoration: 'none' }}
                  >
                    로그인
                  </Link>
                </Box>
                <Box className="font-smooth" fontSize="1.1em" mx={2}>
                  <Link
                    to="/regist"
                    className="nbg user"
                    style={{ textDecoration: 'none' }}
                  >
                    회원가입
                  </Link>
                </Box>
              </>
            ) : (
              <>
                <Box
                  display="flex"
                  className="nbg_m font-smooth"
                  alignItems="center"
                  style={{ fontSize: '1em' }}
                >
                  {/* <Box mr={1}>{user.nickname}님</Box> */}
                  <IconButton onClick={handleClick}>
                    <Avatar
                      src={user.picture}
                      style={{ width: '45px', height: '45px' }}
                    ></Avatar>
                  </IconButton>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
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
                <ListItem style={{ cursor: 'default' }}>
                  <ListItemText
                    primary={
                      <div className="nbg_m" style={{ fontSize: '1.2em' }}>
                        {user.nickname}
                      </div>
                    }
                    secondary={
                      <div className="nbg_m" style={{ fontSize: '0.8em' }}>
                        {user.email}
                      </div>
                    }
                  ></ListItemText>
                </ListItem>
                {user.role == 'ADMIN' ? (
                  <>
                    <Divider />
                    <ListItem button onClick={handleAdminBtn}>
                      <ListItemText
                        primary={
                          <div
                            className="nbg_m font-smooth"
                            style={{ fontSize: '1.1em' }}
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
                      <div className="nbg_m" style={{ fontSize: '1.1em' }}>
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
                      <div className="nbg_m" style={{ fontSize: '1.1em' }}>
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
    </>
  );
};

export default Navbar;
