import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
} from '@material-ui/core';
import React, { useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styles from './Profile.module.css';
import classNames from 'classnames';

const Profile = () => {
  const [fold, setFold] = useState(true);

  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
        나의 프로필
      </Box>
      <Card variant="outlined">
        <CardContent>
          <Grid container>
            <Grid item xs={2}>
              <Avatar className={styles.avatar}>H</Avatar>
            </Grid>
            <Grid item xs={4}>
              <Box ml={2} mt={1}>
                <Grid
                  container
                  alignItems="center"
                  item
                  xs={12}
                  className="nbg"
                  style={{ fontSize: '0.9em' }}
                >
                  <LockIcon
                    style={{ color: '#DE213D', fontSize: '1.4em' }}
                  ></LockIcon>
                  <Box style={{ color: '#696969' }}>인증레벨 A+</Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="nbg_bold"
                  style={{ fontSize: '1.4em' }}
                >
                  <Box mt={1}>김재성님</Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="nbg_bold"
                  style={{ fontSize: '1em', color: 'grey' }}
                >
                  example@example.com
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" className="btn_main nbg_bold">
                  닉네임 변경
                </Button>
                <Button
                  variant="contained"
                  className="btn_main nbg_bold"
                  style={{ marginLeft: '15px' }}
                >
                  비밀번호 변경
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <Collapse in={!fold}>
          <CardContent>
            <Grid container>
              <Grid container item xs={12}>
                <LockIcon
                  style={{ color: '#DE213D', fontSize: '1.4em' }}
                ></LockIcon>
                <Box className="nbg_bold" style={{ color: '#696969' }}>
                  인증레벨 A+
                </Box>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={3}>
                  <Grid item container xs={12} justify="center">
                    <PersonOutlineIcon
                      className={classNames('main_color', styles.icon)}
                    />
                  </Grid>
                  <Grid item container xs={12} justify="center">
                    <Box className="nbg_bold">성인 인증</Box>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid item container xs={12} justify="center">
                    <FavoriteBorderIcon
                      className={classNames('main_color', styles.icon)}
                    />
                  </Grid>
                  <Grid item container xs={12} justify="center">
                    <Box className="nbg_bold">팬활동 인증</Box>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid item container xs={12} justify="center">
                    <EmojiPeopleIcon
                      className={classNames('main_color', styles.icon)}
                    />
                  </Grid>
                  <Grid item container xs={12} justify="center">
                    <Box className="nbg_bold">총대 신상 인증</Box>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid item container xs={12} justify="center">
                    <AddCircleOutlineIcon
                      className={classNames('main_color', styles.icon)}
                    />
                  </Grid>
                  <Grid item container xs={12} justify="center">
                    <Box className="nbg_bold">플러스 인증</Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
        <Box display="flex" justifyContent="center">
          <Button
            fullWidth
            onClick={() => {
              setFold(!fold);
            }}
          >
            {fold ? (
              <KeyboardArrowDownIcon style={{ fontSize: '2em' }} />
            ) : (
              <KeyboardArrowUpIcon style={{ fontSize: '2em' }} />
            )}
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default Profile;
