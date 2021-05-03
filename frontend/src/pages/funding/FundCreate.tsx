import React from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { TextField, Box, Grid, Button, Dialog, DialogTitle } from '@material-ui/core';
import { Editor } from '@toast-ui/react-editor';
import DaumPostcode from 'react-daum-postcode';
import './FundCreate.css';

const FundCreate = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = React.useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [selectedValue] = React.useState("0");
    interface SimpleDialogProps {
        open: boolean;
        selectedValue: string;
        onClose: (value: string) => void;
    }

    function SimpleDialog(props: SimpleDialogProps) {
        const { onClose, selectedValue, open } = props;
        // const { onClose, open } = props;

        const handleClose = () => {
            onClose(selectedValue);
        };

        return (
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                <DaumPostcode width="500px"
                    onComplete={handleComplete}
                />
            </Dialog>
        );
    }

    const handleComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        console.log(fullAddress);
        selectedValue = fullAddress;
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };
    return (
        <div className="container">
            <h3>펀딩 작성하기</h3>
            <Button variant="contained" color="primary">
                기부
            </Button>
            <Button variant="contained" color="primary">
                기본 펀딩
            </Button>
        
                <TextField className="col-md-12" style={{width:"100%"}} label="펀딩 제목" placeholder="우리 아이돌만의 기부 릴레이 4월유기견 보호소 강아지들 사료 지원 프로젝트" variant="outlined" />
    
        
                <TextField className="col-md-12" style={{width:"100%"}} label="아이돌 리스트" placeholder="우리 아이돌만의 기부 릴레이 4월유기견 보호소 강아지들 사료 지원 프로젝트" variant="outlined" />

            <div className="row">
                <TextField className="col-md-6" style={{width:"100%"}} label="펀딩 목표 금액" placeholder="목표금액(원)" variant="outlined" />
                <TextField className="col-md-6" style={{width:"100%"}} label="기간" variant="outlined" />
            </div>

            <div className="row">
            <TextField  className="col-md-10" label="기부처 주소" disabled variant="outlined" />
 
                <Button className="col-md-2" variant="contained" color="primary" onClick={handleClickOpen}>
                    검색
            </Button>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />

            </div>
            
            <Box>
                <TextField label="기부 상세 내용" variant="outlined" multiline></TextField>
            </Box>

            <Editor
                initialValue="원하는 문장을 입력해주세요.."
                previewStyle="vertical"
                height="500px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
            />
            <Button variant="contained" color="primary" >
                신청
            </Button>
        </div>
    );
};
export default FundCreate;