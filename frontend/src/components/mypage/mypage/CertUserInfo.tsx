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
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { User, ResponseUser } from '../../../common/types';
import { rootState } from '../../../reducers';
import { Editor } from '@toast-ui/react-editor';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CertUserInfo = (props: Props) => {
  const { onClose, open } = props;
  const [fileName, setFileName] = useState<string>('');
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  const handleClose = () => {
    onClose();
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const editorRef: any = useRef();

  const getEditor = () => {
    const editorInstance = editorRef.current.getInstance();
    const getContent_html = editorInstance.getHtml();

    return getContent_html;
  };
  const handleImage = (e: any) => {
    console.log(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const handleSubmit = () => {};
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>총대 신상 인증</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid container item xs={12} alignItems="center">
            <Button variant="contained" component="label">
              사진 파일
              <input
                type="file"
                hidden
                accept=".gif, .jpg, .png"
                onChange={handleImage}
              />
            </Button>
            <Box ml={1}>{fileName}</Box>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="이름" variant="outlined"></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="나이" variant="outlined"></TextField>
          </Grid>
        </Grid>
        <div className="row">
          <div className="col-md-12 editor">
            <Editor
              //initialValue="원하는 문장을 입력해주세요.."
              previewStyle="vertical"
              height="500px"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
              placeholder="신상 정보를 입력해주세요."
              ref={editorRef}
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
