import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  User,
  loginSubmit,
  validateId,
  validatePassword,
} from '../../../api/user';

const SignIn = () => {
  const [user, setUser] = useState<User>(new User());
  const [validateds, setValidateds] = useState<boolean[]>([false, false]);

  return (
    <Grid container spacing={2}>
      <Grid item className="large_logo mb-5" xs={12}>
        fundy
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          error={user.email != '' && !validateds[0]}
          helperText={
            user.email != '' && !validateds[0]
              ? '이메일 형식이 올바른지 확인해주세요.'
              : ''
          }
          value={user.email}
          onChange={(e) => {
            if (validateds[0] !== validateId(e.target.value)) {
              let newValidateds = [...validateds];
              newValidateds[0] = !newValidateds[0];
              setValidateds(newValidateds);
            }
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
          error={user.password != '' && !validateds[1]}
          onChange={(e) => {
            if (validateds[1] !== validatePassword(e.target.value)) {
              let newValidateds = [...validateds];
              newValidateds[1] = !newValidateds[1];
              setValidateds(newValidateds);
            }
            setUser({ ...user, password: e.target.value });
          }}
          helperText={
            user.password != '' && !validateds[1]
              ? '비밀번호는 8자 이상으로 입력해주세요.'
              : ''
          }
          type="password"
          label="비밀번호"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel control={<Checkbox />} label="아이디 저장" />
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={validateds.includes(false)}
          disableElevation
          variant="contained"
          size="large"
          fullWidth
          onClick={() => {
            loginSubmit(user);
          }}
          className={
            !validateds.includes(false) ? 'btn_main nbg_bold' : 'nbg_bold'
          }
        >
          로그인
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignIn;
