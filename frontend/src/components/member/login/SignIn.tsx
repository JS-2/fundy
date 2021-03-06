import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { loginSubmit, validateId, validatePassword } from '../../../api/user';
import { LoginUser } from '../../../common/types';
import { rootState } from '../../../reducers';
import { setUser } from '../../../reducers/user';

const SignIn = () => {
  const [user, setUserInfo] = useState<LoginUser>({
    userEmail: '',
    userPassword: '',
  });
  const [validateds, setValidateds] = useState<boolean[]>([false, false]);
  const [saved, setSaved] = useState<boolean>(false);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      localStorage.getItem('saveEmail') !== undefined &&
      localStorage.getItem('saveEmail') !== '' &&
      localStorage.getItem('saveEmail') !== null
    ) {
      setUserInfo({ ...user, userEmail: localStorage.getItem('saveEmail')! });
      setSaved(true);
    }
  }, []);

  useEffect(() => {
    if (validateds[0] !== validateId(user.userEmail)) {
      let newValidateds = [...validateds];
      newValidateds[0] = !newValidateds[0];
      setValidateds(newValidateds);
    }
  }, [user]);

  const handleKeyPress = (e: any) => {
    if (e.keyCode == 13 && !validateds.includes(false)) {
      handleLoginBtn();
    }
  };

  const handleLoginBtn = () => {
    loginSubmit(user)
      .then((response) => {
        dispatch(setUser(response.data, response.headers.token));
        if (saved) {
          localStorage.setItem('saveEmail', user.userEmail);
        } else {
          localStorage.setItem('saveEmail', '');
        }
        history.push('/');
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
        } else {
          alert('통신 오류입니다.');
        }
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item className="large_logo main_color mb-5" xs={12}>
        fundy
      </Grid>
      <Grid className="nbg_m" item xs={12}>
        <TextField
          fullWidth
          onKeyDown={handleKeyPress}
          inputProps={{
            style: { fontSize: '1.6em', height: '15px' },
          }}
          InputLabelProps={{
            style: { fontSize: '0.8em' },
          }}
          error={user.userEmail != '' && !validateds[0]}
          helperText={
            user.userEmail != '' && !validateds[0] ? (
              <Box className="nbg_m" fontSize="0.7em">
                이메일 형식이 올바른지 확인해주세요.
              </Box>
            ) : (
              ''
            )
          }
          value={user.userEmail}
          onChange={(e) => {
            if (validateds[0] !== validateId(e.target.value)) {
              let newValidateds = [...validateds];
              newValidateds[0] = !newValidateds[0];
              setValidateds(newValidateds);
            }
            setUserInfo({ ...user, userEmail: e.target.value });
          }}
          label="아이디(이메일)"
          variant="outlined"
        />
      </Grid>
      <Grid className="nbg_m" item xs={12}>
        <TextField
          fullWidth
          onKeyDown={handleKeyPress}
          inputProps={{
            style: { fontSize: '1.6em', height: '15px' },
          }}
          InputLabelProps={{
            style: { fontSize: '0.8em' },
          }}
          value={user.userPassword}
          error={user.userPassword != '' && !validateds[1]}
          onChange={(e) => {
            if (validateds[1] !== validatePassword(e.target.value)) {
              let newValidateds = [...validateds];
              newValidateds[1] = !newValidateds[1];
              setValidateds(newValidateds);
            }
            setUserInfo({ ...user, userPassword: e.target.value });
          }}
          helperText={
            user.userPassword != '' && !validateds[1] ? (
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
      <Grid className="nbg_m font-smooth" item xs={12}>
        <FormControlLabel
          control={<Checkbox checked={saved} />}
          label={
            <Box className="nbg_m font-smooth" component="div" fontSize="0.7em">
              아이디 저장
            </Box>
          }
          onChange={(e) => {
            setSaved(!saved);
          }}
        />
      </Grid>
      <Grid className="font-smooth" item xs={12}>
        <Button
          disabled={validateds.includes(false)}
          disableElevation
          variant="contained"
          size="large"
          style={{ fontSize: '1.1em' }}
          fullWidth
          onClick={handleLoginBtn}
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
