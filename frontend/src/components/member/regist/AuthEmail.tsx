import { Box, Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './AuthEmail.module.css';
import classNames from 'classnames';
import { sendAuthMail, validateId, sendCode } from '../../../api/user';

interface Props {
  setUserEmail: Function;
}

const AuthEmail = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [validated, setValidated] = useState<boolean>(false);
  const handleSendMail = () => {
    sendAuthMail(email).then((resp) => {
      alert('인증번호 전송완료');
    });
  };

  const handleSendCode = () => {
    sendCode(code)
      .then((resp) => {
        props.setUserEmail(email);
      })
      .catch(() => {
        alert('인증번호가 틀렸습니다.');
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        className={classNames('large_logo main_color mb-5', styles.large_logo)}
        xs={12}
      >
        fundy
      </Grid>
      <Grid item xs={8}>
        <TextField
          inputProps={{
            style: { fontSize: '1.6em', height: '15px' },
          }}
          InputLabelProps={{
            style: { fontSize: '0.8em' },
          }}
          fullWidth
          error={email !== '' && !validated}
          label="아이디(이메일)"
          variant="outlined"
          value={email}
          helperText={
            email !== '' && !validated ? (
              <Box className="nbg_m" fontSize="0.7em">
                이메일 형식이 올바른지 확인해주세요.
              </Box>
            ) : (
              <></>
            )
          }
          onChange={(e) => {
            if (validated !== validateId(e.target.value)) {
              setValidated(!validated);
            }
            setEmail(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={4} className="pl-0">
        <Button
          disabled={!validated}
          disableElevation
          fullWidth
          size="large"
          variant="contained"
          onClick={handleSendMail}
          className={
            !validated
              ? classNames('nbg_bold', styles.auth_btn)
              : classNames('nbg_bold', styles.auth_btn, styles.valided)
          }
        >
          인증코드전송
        </Button>
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
          label="인증번호"
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          helperText="'-'를 제외한 인증코드를 입력해주세요"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={code.length == 0}
          disableElevation
          variant="contained"
          size="large"
          fullWidth
          className={code.length == 0 ? '' : 'btn_main nbg_bold'}
          onClick={handleSendCode}
        >
          확인
        </Button>
      </Grid>
    </Grid>
  );
};

export default AuthEmail;
