import React, { useEffect, useRef } from 'react';
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
  NativeSelect,
  InputLabel,
  Select,
  Grid,
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
import { FundingForm, IDonationPlace } from '../../common/types';
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
import { useHistory } from 'react-router-dom';
import { getAllIdolList } from '../../api/idol';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FundingPlaceCard from '../../components/fundComponent/FundingPlaceCard';
import { getAllDonationPlaces } from '../../api/funding';
import Banner from '../../components/Banner';

const FundCreate = () => {
  const [fundingType, setFundingType] = useState('Donation');
  const [idolId, setIdolId] = useState(0);
  const [fundName, setFundName] = useState<string>('');
  const [fundShortInfo, setFundShortInfo] = useState<string>('');
  const [thumbnails, setThumbnails] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [locationDetail, setLocationDetail] = useState<string>('');
  const [goalAmount, setGoalAmount] = useState('');
  const [endTime, setEndTime] = useState<string>('');
  const [fundDetail, setFundDetail] = useState('');
  let [selectedValue] = React.useState('0');
  const [file, setFile] = useState<any>();
  const [fileURL, setFileURL] = useState<any>();
  const [selectedStartDate, handleStartDateChange] =
    useState<MaterialUiPickersDate>(new Date());
  const [selectedEndDate, handleEndDateChange] =
    useState<MaterialUiPickersDate>(new Date());
  const [fundingPercent, setFundingPercent] = useState<number>(0);

  const [idolNames, setIdolNames] = useState<string[]>([]);
  const [places, setPlaces] = useState<IDonationPlace[]>([]);
  const [placeId, setPlaceId] = useState<number>(1);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  const history = useHistory();

  useEffect(() => {
    getAllIdolList().then((resp) => {
      setIdolNames(resp.data);
    });
    getAllDonationPlaces().then((resp) => {
      console.log(resp.data);
      setPlaces(resp.data);
    });
  }, []);
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const fundForm: FundingForm = {
      donationPlaceId: placeId,
      donationRate: fundingPercent,
      endTime: selectedEndDate,
      fundingContent: fundDetail,
      fundingName: fundName,
      fundingSubtitle: fundShortInfo,
      fundingType: fundingType,
      goalAmount: Number(goalAmount),
      idolId: idolId,
      startTime: selectedStartDate,
      thumbnail: file,
    };
    console.log({
      fundForm,
    });
    console.log(fundDetail);
    setFundCreate(fundForm, token).then(() => {
      history.push({
        pathname: '/funding',
        state: {},
      });
    });
  };

  const onlocation = (address: string) => {
    setLocation(address);
  };

  const [open, setOpen] = React.useState(false);

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
    console.log('IMG FILE>>>>>' + thumbnails);
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

  const handleRadio = (e: any) => {
    console.log(e.target.value);
    setFundingPercent(Number(e.target.value));
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

  const handleFileOnChange = (event: any) => {
    event.preventDefault();
    const reader = new FileReader();
    let file = event.target.files[0];
    console.log(file);
    setFile(file);
    if (file !== undefined) {
      reader.onloadend = () => {
        setFileURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
    <Banner></Banner>
    <div className="container">
      
      <h3>펀딩 작성하기</h3>
      <br></br>
      <hr></hr>
      <div className="row">
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="type"
            name="type"
            value={fundingType}
            onChange={onChangeFundingType}
          >
            <FormLabel component="legend">펀딩 종류</FormLabel>
            <LightTooltip title="아이돌의 이름으로 기부되는 펀딩입니다.">
              <FormControlLabel
                value="Donation"
                control={<Radio />}
                label="기부 펀딩"
              />
            </LightTooltip>
            <LightTooltip title="일반적인 아이돌 펀딩입니다">
              <FormControlLabel
                value="Basic"
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
        <Autocomplete
          options={idolNames}
          getOptionLabel={(idol: any) => idol.idolName}
          renderInput={(params) => (
            <TextField
              {...params}
              label="등록된 아이돌 이름 찾기"
              variant="outlined"
            />
          )}
          onChange={(e, value: any) => {
            setIdolId(value.idolId);
          }}
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
        <div>
          <input
            type="file"
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            name="profile_img"
            onChange={handleFileOnChange}
          ></input>
          {file !== undefined ? (
            <img
              className="profile_preview col-md-6"
              width="100%"
              src={fileURL}
            ></img>
          ) : (
            <></>
          )}
        </div>
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
        <RadioGroup row value={fundingPercent} onChange={handleRadio}>
          <FormControlLabel
            value={0}
            control={<Radio color="primary" />}
            label="기부 없음"
          />
          <FormControlLabel
            value={5}
            control={<Radio color="primary" />}
            label="5% 기부"
          />
          <FormControlLabel
            value={10}
            control={<Radio color="primary" />}
            label="10% 기부"
          />
        </RadioGroup>
      </div>
      <div className="row">
        <div className="col-md-3">
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
        <div className="col-md-3">
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
      <Grid container spacing={3}>
        {places.map((place) => (
          <Grid item xs={6}>
            <FundingPlaceCard
              place={place}
              placeId={placeId}
              setPlaceId={setPlaceId}
            />
          </Grid>
        ))}
      </Grid>

      <div className="row">
        <div className="col-md-12 editor">
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
    </div>
  );
};

export default FundCreate;
