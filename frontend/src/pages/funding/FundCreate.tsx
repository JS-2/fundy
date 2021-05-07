import React from "react";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import Tooltip from "@material-ui/core/Tooltip";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  RadioGroup,
} from "@material-ui/core";
import { withStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Editor } from "@toast-ui/react-editor";
import DaumPostcode from "react-daum-postcode";
import "./FundCreate.css";
import MuiPickersUtilsProvider from "../../components/fundComponent/MuiPickersUtilsProvider";
import ImageUploader from "react-images-upload";
import IconButton from '@material-ui/core/IconButton';
import SearchButton from '@material-ui/icons/Search';
import { useState } from "react";


interface State{
  fundType: number;
  idolNumber: number;
  fundname:string;
  fundShortInfo:string;
  fundImgUrl: string;
  fundMoney:number;
  fundDate: string;
  location: string;
  fundDetail:string;
}

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
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <DaumPostcode width="500px" onComplete={handleComplete} />
      </Dialog>
    );
  }

  const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 14,
    },
  }))(Tooltip);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress);

    selectedValue = fullAddress;

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  const [value, setValue] = React.useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const state = { location: "" };

  return (
    <div className="container">
      <h3>펀딩 작성하기</h3>
      <br></br>
      <hr></hr>
          <div className="row">
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
        >

            <FormLabel component="legend">펀딩 종류</FormLabel>
            <LightTooltip title="아이돌의 이름으로 기부되는 펀딩입니다.">
              <FormControlLabel
                value="donate"
                control={<Radio />}
                label="기부 펀딩"
              />
            </LightTooltip>
            <LightTooltip title="일반적인 아이돌 펀딩입니다">
              <FormControlLabel
                value="basic"
                control={<Radio />}
                label="기본 펀딩"
              />
            </LightTooltip>
         
        </RadioGroup>
      </FormControl>
      </div>
      <div className="row">
      <TextField
        className="col-md-12 input"
        style={{ width: "100%" }}
        label="펀딩 제목"
        placeholder="싸피싸피의 기부 릴레이 4월유기견 보호소 강아지들 사료 지원 프로젝트"
        variant="outlined"
      />
      </div>
      <div className="row">

      <TextField
        className="col-md-12 input"
        style={{ width: "100%" }}
        label="아이돌 리스트"
        placeholder="싸피싸피"
        variant="outlined"
      />
      </div>
         <div className="row">
        <TextField
          className="col-md-12 input"
          label="펀딩 한줄 소개"
          multiline
        ></TextField>
      </div>

      <div>
      <h5>펀딩 이미지 업로드</h5>
        <ImageUploader
          withIcon={true}
          buttonText="이미지를 선택하세요"
          className="col-md-6 input"
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          withPreview={true}
        />
      </div>

   

      <div className="row">
        <TextField
          className="col-md-6 input"
          style={{ width: "100%" }}
          label="펀딩 목표 금액"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="목표금액(원)"
          variant="outlined"
        />
                <div className="col-md-6 input">
        <MuiPickersUtilsProvider></MuiPickersUtilsProvider>
     </div>
      </div>

      <div className="row">
        <TextField
          className="col-md-10 input"
          label="기부처 주소"
          disabled
          variant="outlined"
          value={state.location}
        />

        <IconButton aria-label="search">
  <SearchButton 
          onClick={handleClickOpen}>검색</SearchButton>
</IconButton>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </div>

      <div className="row">
        <div className="col-md-12">
          <Editor
            //initialValue="원하는 문장을 입력해주세요.."
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            placeholder="펀딩에 대해 상세하게 설명해주세요."
          />
        </div>
      </div>
      <div className="buttonSubmit">
      <Button variant="contained" color="primary">
        신청
      </Button>
      </div>

    </div>
  );
};

export default FundCreate;
function setState(arg0: (prevState: any, props: any) => { location: string }) {
  throw new Error("Function not implemented.");
}
