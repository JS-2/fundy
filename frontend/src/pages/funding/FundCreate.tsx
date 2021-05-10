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
  Box,
} from "@material-ui/core";
import { withStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Editor } from "@toast-ui/react-editor";
import DaumPostcode from "react-daum-postcode";
import "./FundCreate.css";
import MuiPickersUtilsProvider from "../../components/fundComponent/MuiPickersUtilsProvider";
import ImageUploader from "react-images-upload";
import IconButton from "@material-ui/core/IconButton";
import SearchButton from "@material-ui/icons/Search";
import { useState } from "react";
import ItemTable from "../../components/fundComponent/ItemTable";

const FundCreate = () => {
  const [fundingType, setFundingType] = useState("");
  const [idolId, setIdolId] = useState("");
  const [fundName, setFundName] = useState<string>("");
  const [fundShortInfo, setFundShortInfo] = useState<string>("");
  const [thumbnails, setThumbnails] = useState([]);
  const [location, setLocation] = useState<string>("");
  const [locationDetail, setLocationDetail] = useState<string>("");
  const [goalAmount, setGoalAmount] = useState("");
  const [endTime, setEndTime] = useState<string>("");
  const [fundDetail, setFundDetail] = useState("");

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log({
      fundingType,
      idolId,
      fundName,
      fundShortInfo,
      thumbnails,
      location,
      locationDetail,
      goalAmount,
      endTime,
      fundDetail,
    });
  };

  const onlocation = (address: string) => {
    setLocation(address);
  };

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
        <DialogTitle id="simple-dialog-title">기부처 주소 입력</DialogTitle>
        <DaumPostcode width="500px" onComplete={handleComplete} />
      </Dialog>
    );
  }

  const onDrop = (thumbnail: any) => {
    setThumbnails(thumbnails.concat(thumbnail));
  };

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
    handleClose(fullAddress);
    onlocation(fullAddress);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value: string) => {
    setOpen(false);
  };
  const [value, setValue] = React.useState("basic");

  const onChangeFundingType = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFundingType(e.target.value);
  };

  const onChangeFundName = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFundName(e.target.value);
  };
  const onChangeIdolId = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setIdolId(e.target.value);
  };
  const onChangeFundShortInfo = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFundShortInfo(e.target.value);
  };
  const onChangeImgUrl = (e: { target: { value: any } }) => {
    onDrop(e.target.value);
  };
  const onChangeLocation = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLocation(e.target.value);
  };
  const onChangeLocationDetail = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLocationDetail(e.target.value);
  };
  const onChangeGoalAmount = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setGoalAmount(e.target.value);
  };
  const onChangeEndTime = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEndTime(e.target.value);
  };
  const onChangeFundDetail = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFundDetail(e.target.value);
  };



  




  return (
    <div className="container">
      <h3>펀딩 작성하기</h3>
      <br></br>
      <hr></hr>
      <div className="row">
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="type"
            name="type"
            value={fundingType}
            onChange={onChangeFundingType}
          >
            <FormLabel component="legend">펀딩 종류</FormLabel>
            <LightTooltip title="아이돌의 이름으로 기부되는 펀딩입니다.">
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="기부 펀딩"
              />
            </LightTooltip>
            <LightTooltip title="일반적인 아이돌 펀딩입니다">
              <FormControlLabel
                value="2"
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
          value={fundName}
          onChange={onChangeFundName}
        />
      </div>
      <div className="row">
        <TextField
          className="col-md-12 input"
          style={{ width: "100%" }}
          label="아이돌 리스트"
          placeholder="싸피싸피"
          variant="outlined"
          onChange={onChangeIdolId}
        />
      </div>
      <div className="row">
        <TextField
          className="col-md-12 input"
          label="펀딩 한줄 소개"
          value={fundShortInfo}
          multiline
          onChange={onChangeFundShortInfo}
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
          onChange={onDrop}
        />
      </div>

      <div className="row">
        <TextField
          className="col-md-6 input"
          label="펀딩 목표 금액"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="목표금액(원)"
          variant="outlined"
          value={goalAmount}
          onChange={onChangeGoalAmount}
        />

        <div className="col-md-6 input">
          <MuiPickersUtilsProvider></MuiPickersUtilsProvider>
        </div>
      </div>
 
      <div className="row">

    </div>
      <div className="row">
        <TextField
          className="col-md-11 input"
          label="기부처 주소"
          onClick={handleClickOpen}
          variant="outlined"
          value={location}
        />

        <IconButton aria-label="search" onClick={handleClickOpen}>
          <SearchButton>검색</SearchButton>
        </IconButton>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </div>
      <div className="row">
        <TextField
          className="col-md-11 input"
          style={{ width: "100%" }}
          label="상세 주소"
          placeholder=""
          variant="outlined"
          value={locationDetail}
          onChange={onChangeLocationDetail}
        />
      </div>

      <div className="row">
        <div className="col-md-12 editor">
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
      <Box
        display="flex"
        justifyContent="flex-end"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <div className="buttonSubmit">
          <Button variant="contained" color="primary" onClick={onSubmit}>
            신청
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default FundCreate;
