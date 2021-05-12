import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  checkNickName,
  loginSubmit,
  modifyNickName,
  validateNickName,
} from '../../../api/user';
import { User, ResponseUser } from '../../../common/types';
import { rootState } from '../../../reducers';
import { setUser } from '../../../reducers/user';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ModifyNickname = (props: Props) => {
  const { onClose, open } = props;
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  const [validate, setValidate] = useState<boolean>();
  const [nickName, setNickName] = useState<string>('');
  const handleClose = () => {
    onClose();
  };
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    checkNickName(nickName).then((resp) => {
      modifyNickName(nickName, user.user_id).then(() => {
        const newUser: ResponseUser = {
          userEmail: user.email,
          userId: user.user_id,
          userLevel: user.level,
          userAddress: user.address,
          userNickname: nickName,
          userPicture: user.picture,
        };
        dispatch(setUser(newUser, token));
        history.push('/');
      });
    });
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>닉네임 변경</DialogTitle>
      <DialogContent>
        <Box>변경 전 닉네임: {user.nickname}</Box>
        <Box>
          <TextField
            fullWidth
            value={nickName}
            error={nickName != '' && !validate}
            onChange={(e) => {
              if (validate !== validateNickName(e.target.value)) {
                setValidate(!validate);
              }
              setNickName(e.target.value);
            }}
            helperText={
              nickName != '' && !validate
                ? '닉네임은 영문 or 한글이 포함된 2~8글자 사이여야 합니다.'
                : ''
            }
            label="변경할 닉네임"
          ></TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!validate}
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

export default ModifyNickname;
