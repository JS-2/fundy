import { Button, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  User,
  registSubmit,
  validateId,
  validatePassword,
  validateNickName,
} from '../../../api/user';

interface Props {
  user: User;
}

const SignUp = (props: Props) => {
  const [user, setUser] = useState<User>({ ...props.user, nickName: '' });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [validateds, setValidateds] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (validateds[1] !== (confirmPassword === user.password)) {
      let newValidateds = [...validateds];
      newValidateds[1] = !newValidateds[1];
      setValidateds(newValidateds);
    }
  }, [user.password, confirmPassword]);

  return (
    <Grid container spacing={2}>
      <Grid className="large_logo main_color mb-5" item xs={12}>
        fundy
      </Grid>
      <Grid item xs={12}>
        <TextField
          InputProps={{
            readOnly: true,
            className: 'disabled_input',
          }}
          fullWidth
          value={user.email}
          label="아이디(이메일)"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={user.password}
          error={user.password != '' && !validateds[0]}
          onChange={(e) => {
            if (validateds[0] !== validatePassword(e.target.value)) {
              let newValidateds = [...validateds];
              newValidateds[0] = !newValidateds[0];
              setValidateds(newValidateds);
            }
            setUser({ ...user, password: e.target.value });
          }}
          helperText={
            user.password != '' && !validateds[0]
              ? '비밀번호는 8자 이상으로 입력해주세요.'
              : ''
          }
          type="password"
          label="비밀번호"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={confirmPassword}
          error={confirmPassword != '' && !validateds[1]}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          helperText={
            confirmPassword != '' && !validateds[1]
              ? '비밀번호와 동일한지 확인해주세요.'
              : ''
          }
          type="password"
          label="비밀번호 확인"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={user.nickName}
          error={user.nickName != '' && !validateds[2]}
          onChange={(e) => {
            if (validateds[2] !== validateNickName(e.target.value)) {
              let newValidateds = [...validateds];
              newValidateds[2] = !newValidateds[2];
              setValidateds(newValidateds);
            }
            setUser({ ...user, nickName: e.target.value });
          }}
          helperText={
            user.nickName != '' && !validateds[2]
              ? '닉네임는 2자 이상, 16자 이하로 입력해주세요.'
              : ''
          }
          label="닉네임"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={validateds.includes(false)}
          disableElevation
          variant="contained"
          size="large"
          onClick={() => {
            registSubmit(user);
          }}
          fullWidth
          className={
            !validateds.includes(false) ? 'btn_main nbg_bold' : 'nbg_bold'
          }
        >
          회원가입
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignUp;
