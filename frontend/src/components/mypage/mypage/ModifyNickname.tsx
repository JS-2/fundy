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
    checkNickName(nickName, token).then((resp) => {
      modifyNickName(nickName, token).then(() => {
        const newUser: ResponseUser = {
          userEmail: user.email,
          userId: user.user_id,
          userLevel: user.level,
          userAddress: user.address,
          userNickname: nickName,
          userPicture: user.picture,
          role: user.role,
        };
        dispatch(setUser(newUser, token));
        history.push('/');
      });
    });
  };
  return (
    <Dialog onClose={handleClose} open={open} style={{ fontSize: '1.1em' }}>
      <Box mb={3} style={{ fontWeight: 'bold', backgroundColor: '#f74a64' }}>
        <Box m={1.5} style={{ color: 'white', fontSize: '1.2em' }}>
          닉네임 변경
        </Box>
      </Box>
      <DialogContent>
        <Box>나만의 멋진 닉네임을 등록하세요.</Box>
        <Box mt={1} display="flex">
          <Box>기존 닉네임:</Box>
          <Box ml={1} className="nbg_bold">
            {user.nickname}
          </Box>
        </Box>
        <Box my={1}>
          <TextField
            fullWidth
            inputProps={{
              style: { fontSize: '1.6em', height: '15px' },
            }}
            InputLabelProps={{
              style: { fontSize: '1em' },
            }}
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
