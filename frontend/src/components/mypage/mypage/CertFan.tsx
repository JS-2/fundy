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
import { Editor } from '@toast-ui/react-editor';
import { useRef, useState } from 'react';

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
    const content = getEditor();
    setContentHtml(content);
  };
  const editorRef: any = useRef();

  const getEditor = () => {
    const editorInstance = editorRef.current.getInstance();
    const getContent_html = editorInstance.getHtml();

    return getContent_html;
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>팬활동 인증</DialogTitle>
      <DialogContent>
        <div className="row">
          <div className="col-md-12 editor">
            <Editor
              //initialValue="원하는 문장을 입력해주세요.."
              previewStyle="vertical"
              height="500px"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
              placeholder="펀딩에 대해 상세하게 설명해주세요."
              ref={editorRef}
            />
          </div>
        </div>
        {contentHtml !== '' ? (
          <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
        ) : (
          <></>
        )}
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
