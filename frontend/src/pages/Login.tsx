import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import './login.css';
import { User, loginSubmit } from '../api/user';

const Login = () => {
  const [user, setUser] = useState<User>(new User());

  return (
    <Box display="flex" justifyContent="center">
      <Box mt={10} width={480}>
        <Grid container spacing={3}>
          <Grid item className="logo login_logo mb-5" xs={12}>
            fundy
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              label="아이디(이메일)"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              type="password"
              label="비밀번호"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox></Checkbox>}
              label="아이디 저장"
            ></FormControlLabel>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => {
                loginSubmit(user);
              }}
              className="btn_main nbg_bold"
            >
              로그인
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
