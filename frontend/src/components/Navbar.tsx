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

  const open = Boolean(anchorEl);




  return (
    <>
      <Box justifyContent="center" className="nav" minWidth={1080}>
        <Box
          display="flex"
          width="100%"
          maxWidth={1440}
          minWidth={1080}
          px={5}
          justifyContent="space-between"
        >
          <Box display="flex">
            <Box className="logo" mr={5}>
              <a id="logoAnchor" href="/">
                fundy
              </a>
            </Box>
            <Box mx={3}>
              <a className="nbg" href="/funding">
                펀딩
              </a>
            </Box>
            <Box mx={3}>
              <a className="nbg" href="/idol">
                아이돌
              </a>
            </Box>
            <Box mx={3}>
              <a className="nbg" href="/store">
                스토어
              </a>
            </Box>
          </Box>
          <Box display="flex">
            {user === null ? (
              <>
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
              </>
            ) : (
              <>
                <Box mx={1} display="flex" alignItems="center">
                  <IconButton onClick={handleClick}>
                    <Avatar src={user.picture}></Avatar>
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
                <ListItem>
                  <ListItemText
                    primary={user.nickname}
                    secondary={user.email}
                  ></ListItemText>
                </ListItem>
                <Divider />
                <ListItem button onClick={handleMypageBtn}>
                  <ListItemText primary="마이페이지"></ListItemText>
                </ListItem>
                <Divider />
                <ListItem
                  button
                  onClick={() => {
                    logoutSubmit(dispatch);
                  }}
                >
                  <ListItemText primary="로그아웃"></ListItemText>
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
