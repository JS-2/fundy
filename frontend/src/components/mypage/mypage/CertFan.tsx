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
import { useRef, useState } from 'react';
import ReactSummernote from 'react-summernote';
import { postFanCert } from '../../../api/admin';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CertFan = (props: Props) => {
  const { onClose, open } = props;
  const [contentHtml, setContentHtml] = useState<string>('');
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  const handleClose = () => {
    onClose();
  };
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    postFanCert(contentHtml, token).then((resp) => {
      window.location.reload();
    });
  };
  const onChangeEdit = (content: any) => {
    console.log('onChange ', content);
    setContentHtml(content);
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

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>팬활동 인증</DialogTitle>
      <DialogContent>
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

export default CertFan;
