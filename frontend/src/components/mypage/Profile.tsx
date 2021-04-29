import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
} from '@material-ui/core';
import React from 'react';
import LockIcon from '@material-ui/icons/Lock';

const Profile = () => {
  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
        나의 프로필
      </Box>
      <Card variant="outlined">
        <CardContent>
          <Grid container>
            <Grid item xs={3}>
              <Avatar style={{ width: '150px', height: '150px' }}>H</Avatar>
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
                  <Box ml={0.2} style={{ color: '#696969' }}>
                    인증레벨 A+
                  </Box>
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
            <Grid item xs={5}>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" className="btn_main nbg_bold">
                  닉네임 변경
                </Button>
                <Button
                  variant="contained"
                  className="btn_main nbg_bold"
                  style={{ marginLeft: '8px' }}
                >
                  비밀번호 변경
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
