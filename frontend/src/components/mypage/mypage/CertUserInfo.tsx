import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { User, ResponseUser, IProfileAuth } from '../../../common/types';
import { rootState } from '../../../reducers';
import ReactSummernote from 'react-summernote';
import { CompareSharp } from '@material-ui/icons';
import { postProfileCert } from '../../../api/admin';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CertUserInfo = (props: Props) => {
  const { onClose, open } = props;
  const [profilePicture, setProfilePicture] = useState<any>();
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [profileHistory, setProfileHistory] = useState<string>('');

  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  console.log(token);
  const handleClose = () => {
    onClose();
  };

  const handleImage = (e: any) => {
    console.log(e.target.files[0]);
    setProfilePicture(e.target.files[0]);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeEdit = (content: any) => {
    setProfileHistory(content);
  };

  const onImageUpload = (
    images: string | any[],
    insertImage: (arg0: string | ArrayBuffer | null) => void
  ) => {
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        insertImage(reader.result);
      };

      reader.readAsDataURL(images[i]);
    }
  };

  const handleSubmit = () => {
    postProfileCert(age, name, profileHistory, profilePicture, token).then(
      () => {
        window.location.reload();
      }
    );
  };

  const handleChangeName = (e: any) => {
    setName(e.target.value);
  };

  const handleChangeAge = (e: any) => {
    setAge(e.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>총대 신상 인증</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid container item xs={12} alignItems="center">
            <input
              type="file"
              accept=".gif, .jpg, .png"
              onChange={handleImage}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="이름"
              variant="outlined"
              value={name}
              onChange={handleChangeName}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="나이"
              variant="outlined"
              type="number"
              value={age}
              onChange={handleChangeAge}
            ></TextField>
          </Grid>
        </Grid>
        <div className="row">
          <div className="col-md-12 editor">
            <ReactSummernote
              placeholder="내용을 입력하여주세요"
              options={{
                lang: 'ko-KR',
                minHeight: 380,
                toolbar: [
                  ['style', ['style']],
                  ['font', ['bold', 'underline', 'clear']],
                  ['fontname', ['fontname']],
                  ['color', ['color']],
                  ['para', ['ul', 'ol', 'paragraph']],
                  ['table', ['table']],
                  ['insert', ['link', 'picture', 'video']],
                  ['view', ['fullscreen']],
                ],
              }}
              onChange={onChangeEdit}
              onImageUpload={onImageUpload}
            />
          </div>
        </div>
      </DialogContent>
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
