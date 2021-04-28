import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './AuthEmail.module.css';
import classNames from 'classnames';
import { validateId } from '../../../api/user';

interface Props {
  setUserEmail: Function;
}

const AuthEmail = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [validated, setValidated] = useState<boolean>(false);

  return (
    <Grid container spacing={2}>
      <Grid
        item
        className={classNames('large_logo mb-5', styles.large_logo)}
        xs={12}
      >
        fundy
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          error={email !== '' && !validated}
          label="아이디(이메일)"
          variant="outlined"
          value={email}
          helperText={
            email !== '' && !validated
              ? '이메일 형식이 올바른지 확인해주세요.'
              : ''
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
        <TextField fullWidth label="인증번호" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <Button
          disableElevation
          variant="contained"
          size="large"
          fullWidth
          className="btn_main nbg_bold"
          onClick={() => {
            props.setUserEmail(email);
          }}
        >
          확인
        </Button>
      </Grid>
    </Grid>
  );
};

export default AuthEmail;
