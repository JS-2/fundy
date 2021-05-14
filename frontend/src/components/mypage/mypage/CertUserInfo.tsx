import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { User, ResponseUser } from '../../../common/types';
import { rootState } from '../../../reducers';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CertUserInfo = (props: Props) => {
  const { onClose, open } = props;
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  const handleClose = () => {
    onClose();
  };
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {};
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>총대 신상 인증</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button fullWidth variant="contained" onClick={handleSubmit}>
          확인
        </Button>
        <Button fullWidth variant="contained" onClick={onClose}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CertUserInfo;
