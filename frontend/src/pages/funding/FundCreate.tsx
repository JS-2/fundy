import React, { useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import Tooltip from '@material-ui/core/Tooltip';
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
} from '@material-ui/core';
import { withStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Editor } from '@toast-ui/react-editor';
import DaumPostcode from 'react-daum-postcode';
import './FundCreate.css';
import ImageUploader from 'react-images-upload';
import IconButton from '@material-ui/core/IconButton';
import SearchButton from '@material-ui/icons/Search';
import { useState } from 'react';
import ItemTable from '../../components/fundComponent/ItemTable';
import {
  DateTimePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { FundingForm } from '../../common/types';
import { useParams } from 'react-router';
import { setFundCreate } from '../../api/fund';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useSelector } from 'react-redux';
import { rootState } from '../../reducers';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';

const FundCreate = () => {
  const [fundingType, setFundingType] = useState('');
  const [idolId, setIdolId] = useState('');
  const [fundName, setFundName] = useState<string>('');
  const [fundShortInfo, setFundShortInfo] = useState<string>('');
  const [thumbnails, setThumbnails] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [locationDetail, setLocationDetail] = useState<string>('');
  const [goalAmount, setGoalAmount] = useState('');
  const [endTime, setEndTime] = useState<string>('');
  const [fundDetail, setFundDetail] = useState('');
  let [selectedValue] = React.useState('0');
  const [selectedStartDate, handleStartDateChange] =
    useState<MaterialUiPickersDate>(new Date());
  const [selectedEndDate, handleEndDateChange] =
    useState<MaterialUiPickersDate>(new Date());

  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //const getMD = getEditor();
    console.log(thumbnails);

    const fundForm: FundingForm = {
      donationLocation: location,
      fundingName: fundName,
      startTime: selectedStartDate,
      endTime: selectedEndDate,
      idolName: idolId,
      fundingContent: fundDetail,
      goalAmount: goalAmount,
      thumbnail: thumbnails,
      fundingSubtitle: fundShortInfo,
      fundingType: 'Donation',
      idolId: 22,
      userId: 3,
      isDonate: true,
    };

    console.log({
      fundForm,
    });
    console.log(fundDetail);

    setFundCreate(fundForm, token);
  };

  const onlocation = (address: string) => {
    setLocation(address);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks

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
    setThumbnails(thumbnail);
  };

  const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 14,
    },
  }))(Tooltip);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
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
  const [value, setValue] = React.useState('basic');

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

  const editorRef: any = useRef();

  const getEditor = () => {
    const editorInstance = editorRef.current.getInstance();
    const getContent_md = editorInstance.getMarkdown();
    console.log(getContent_md);
    const getContent_html = editorInstance.getHtml();
    console.log(getContent_html);

    return getContent_html;
  };

  const onChangeEdit = (content: any) => {
    console.log('onChange ', content);
    setFundDetail(content);
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

  // const uploadImage = (blob: string | Blob) => {
  //   let formData = new FormData();

  //   formData.append("image", blob);
  //   console.log(formData);

  //   return axios("http://localhost:3001/api/imageupload", {
  //     method: "POST",
  //     data: formData,
  //     headers: { "Content-type": "multipart/form-data" },
  //   }).then((response: { data: any }) => {
  //     if (response.data) {
  //       return response.data;
  //     }

  //     throw new Error("Server or network error");
  //   });
  // };

  // const onAddImageBlob = (
  //   blob: any,
  //   callback: (arg0: any, arg1: string) => void
  // ) => {
  //   uploadImage(blob)
  //     .then((response: any) => {
  //       if (!response) {
  //         throw new Error("Validation error");
  //       } else callback(response, "alt text");
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // };

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
          required
          className="col-md-12 input"
          style={{ width: '100%' }}
          label="펀딩 제목"
          placeholder="싸피싸피의 기부 릴레이 4월 - 유기견 보호소 강아지들 사료 지원 프로젝트"
          variant="outlined"
          value={fundName}
          onChange={onChangeFundName}
        />
      </div>
      <div className="row">
        <TextField
          required
          className="col-md-12 input"
          style={{ width: '100%' }}
          label="아이돌 리스트"
          placeholder="싸피싸피"
          variant="outlined"
          onChange={onChangeIdolId}
        />
      </div>
      <div className="row">
        <TextField
          required
          className="col-md-12 input"
          label="펀딩 한줄 소개"
          value={fundShortInfo}
          variant="outlined"
          multiline
          onChange={onChangeFundShortInfo}
        ></TextField>
      </div>

      <div>
        <h5>펀딩 썸네일 업로드</h5>
        <ImageUploader
          withIcon={true}
          buttonText="이미지를 선택하세요"
          className="col-md-6 input"
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
          withPreview={true}
          onChange={onDrop}
        />
      </div>

      <div className="row">
        <TextField
          required
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
      </div>

      <div className="row">
        <div className="col-md-6 input"></div>
      </div>
      <div className="row">
        <div className="col-md-3 input">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              required
              value={selectedStartDate}
              onChange={handleStartDateChange}
              label="펀딩 시작"
              onError={console.log}
              minDate={new Date('2018-01-01T00:00')}
              format="yyyy/MM/dd hh:mm a"
              disablePast
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="col-md-3 input">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              required
              value={selectedEndDate}
              onChange={handleEndDateChange}
              label="펀딩 종료"
              onError={console.log}
              minDate={selectedStartDate}
              format="yyyy/MM/dd hh:mm a"
              disablePast
            />
          </MuiPickersUtilsProvider>
        </div>
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
          style={{ width: '100%' }}
          label="상세 주소"
          placeholder=""
          variant="outlined"
          value={locationDetail}
          onChange={onChangeLocationDetail}
        />
      </div>

      <div className="row">
        <div className="col-md-12 editor">
          {/* <Editor
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            placeholder="펀딩에 대해 상세하게 설명해주세요."
            ref={editorRef}
            plugins={plugin}
          /> */}

          <ReactSummernote
            placeholder="내용을 입력하여주세요"
            options={{
              lang: 'ko-KR',
              minHeight: 380,
              dialogsInBody: true,
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
