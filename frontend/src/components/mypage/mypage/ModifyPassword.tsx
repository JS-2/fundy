import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginSubmit,
  logoutSubmit,
  modifyPassword,
  passwordCheck,
  validatePassword,
} from '../../../api/user';
import { User } from '../../../common/types';
import { rootState } from '../../../reducers';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ModifyPassword = (props: Props) => {
  const { onClose, open } = props;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [validateds, setValidateds] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const dispatch = useDispatch();
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    passwordCheck(user.email, oldPassword).then((resp) => {
      if (resp.status === 200) {
        modifyPassword(newPassword, token).then((pwResp) => {
          logoutSubmit(dispatch);
        });
      }
    });
  };

  useEffect(() => {
    if (validateds[2] !== (newPasswordConfirm === newPassword)) {
      let newValidateds = [...validateds];
      newValidateds[2] = !newValidateds[2];
      setValidateds(newValidateds);
    }
  }, [newPassword, newPasswordConfirm]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>비밀번호 변경</DialogTitle>
      <DialogContent>
        <Box>안전한 비밀번호로 내정보를 보호하세요</Box>
        <Box>다른 아이디/사이트에서 사용한 적 없는 비밀번호</Box>{' '}
        <Box>이전에 사용한 적 없는 비밀번호가 안전합니다.</Box>
        <Box>
          <TextField
            fullWidth
            value={oldPassword}
            onChange={(e) => {
              if (validateds[0] !== (e.target.value.length !== 0)) {
                let newValidateds = [...validateds];
                newValidateds[0] = !newValidateds[0];
                setValidateds(newValidateds);
              }
              setOldPassword(e.target.value);
            }}
            type="password"
            label="현재 비밀번호"
          ></TextField>
        </Box>
        <Box>
          <TextField
            fullWidth
            value={newPassword}
            error={newPassword != '' && !validateds[1]}
            onChange={(e) => {
              if (validateds[1] !== validatePassword(e.target.value)) {
                let newValidateds = [...validateds];
                newValidateds[1] = !newValidateds[1];
                setValidateds(newValidateds);
              }
              setNewPassword(e.target.value);
            }}
            helperText={
              newPassword != '' && !validateds[1]
                ? '비밀번호는 영문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8글자 이상의 비밀번호여야 합니다.'
                : ''
            }
            type="password"
            label="새 비밀번호"
          ></TextField>
        </Box>
        <Box>
          <TextField
            fullWidth
            value={newPasswordConfirm}
            error={newPasswordConfirm != '' && !validateds[2]}
            onChange={(e) => {
              setNewPasswordConfirm(e.target.value);
            }}
            helperText={
              newPasswordConfirm != '' && !validateds[2]
                ? '비밀번호와 동일한지 확인해주세요.'
                : ''
            }
            type="password"
            label="비밀번호 확인"
          ></TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={validateds.includes(false)}
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          확인
        </Button>
        <Button fullWidth variant="contained" onClick={onClose}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModifyPassword;
