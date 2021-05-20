import { Box, Button, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RegistUser } from '../../../common/types';
import {
  registSubmit,
  validateId,
  validatePassword,
  validateNickName,
} from '../../../api/user';
import { useHistory } from 'react-router';

interface Props {
  user: RegistUser;
}

const SignUp = (props: Props) => {
  const [user, setUser] = useState<RegistUser>({ ...props.user, nickname: '' });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [validateds, setValidateds] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [show, setShow] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    if (validateds[1] !== (confirmPassword === user.password)) {
      let newValidateds = [...validateds];
      newValidateds[1] = !newValidateds[1];
      setValidateds(newValidateds);
    }
  }, [user.password, confirmPassword]);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 10);
  }, []);
  return (
    <div style={{ opacity: show ? 1 : 0, transition: 'all 0.5s ease-in-out' }}>
      <Grid container spacing={2}>
        <Grid className="large_logo main_color mb-5" item xs={12}>
          fundy
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputProps={{
              style: { fontSize: '1.6em', height: '15px' },
            }}
            InputLabelProps={{
              style: { fontSize: '0.8em' },
            }}
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
            inputProps={{
              style: { fontSize: '1.6em', height: '15px' },
            }}
            InputLabelProps={{
              style: { fontSize: '0.8em' },
            }}
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
              user.password != '' && !validateds[0] ? (
                <Box className="nbg_m" fontSize="0.7em">
                  8자 이상의 영문 대소문자, 숫자, 특수문자만 가능합니다.
                </Box>
              ) : (
                ''
              )
            }
            type="password"
            label="비밀번호"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputProps={{
              style: { fontSize: '1.6em', height: '15px' },
            }}
            InputLabelProps={{
              style: { fontSize: '0.8em' },
            }}
            fullWidth
            value={confirmPassword}
            error={confirmPassword != '' && !validateds[1]}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            helperText={
              confirmPassword != '' && !validateds[1] ? (
                <Box className="nbg_m" fontSize="0.7em">
                  비밀번호가 동일한지 확인해주세요.
                </Box>
              ) : (
                ''
              )
            }
            type="password"
            label="비밀번호 확인"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputProps={{
              style: { fontSize: '1.6em', height: '15px' },
            }}
            InputLabelProps={{
              style: { fontSize: '0.8em' },
            }}
            fullWidth
            value={user.nickname}
            error={user.nickname != '' && !validateds[2]}
            onChange={(e) => {
              if (validateds[2] !== validateNickName(e.target.value)) {
                let newValidateds = [...validateds];
                newValidateds[2] = !newValidateds[2];
                setValidateds(newValidateds);
              }
              setUser({ ...user, nickname: e.target.value });
            }}
            helperText={
              user.nickname != '' && !validateds[2] ? (
                <Box className="nbg_m" fontSize="0.7em">
                  닉네임은 영문 or 한글이 포함된 2~8글자 사이여야 합니다.
                </Box>
              ) : (
                ''
              )
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
              registSubmit(user, history);
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
    </div>
  );
};

export default SignUp;
