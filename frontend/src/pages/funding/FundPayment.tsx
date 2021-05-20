import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { getFundDetail, getFundNotice } from '../../api/fund';
import { setPayment } from '../../api/funding';
import { FundForm, FundingNotice, User } from '../../common/types';
import Banner from '../../components/Banner';
import FullWidthTabs from '../../components/fundComponent/FullWidthTabs';
import { rootState } from '../../reducers';
import './FundingDetail.css';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

declare global {
  interface Window {
    IMP: any;
  }
}
const { IMP } = window;
interface MatchParams {
  num: string;
}

const FundPayment = ({ match }: RouteComponentProps<MatchParams>) => {
  const params: Params = useParams();
  interface Params {
    fund_id: string;
  }

  const [agree, setAgree] = useState<boolean>(false);
  const [Fund, setFund] = useState<FundForm>();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
    checkedF: true,
    checkedG: true,
  });
  useEffect(() => {
    getFundDetail(Number(match.params.num)).then((response) => {
      setFund(response.data);
    });
  }, [params]);

  const [money, setMoney] = useState<number>(10000);

  const handlerMoney = (e: any) => {
    setMoney(Number(e.target.value));
  };

  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const [percentage, setPercentage] = useState<number>();

  const history = useHistory();

  interface Params {
    fund_id: string;
  }

  interface Props {
    fundInfo: FundForm | undefined;
  }
  const [open, setOpen] = React.useState(false);

  const [notices, setNotices] = useState<FundingNotice[]>([]);

  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );

  useEffect(() => {
    getFundDetail(Number(match.params.num)).then((response) => {
      setFund(response.data);
    });

    if (Fund?.fundingAchievementRate != null) {
      if (Number(Fund?.fundingAchievementRate) >= 100) {
        setPercentage(100);
      } else setPercentage(Number(Fund?.fundingAchievementRate));
    }
  }, [params]);

  useEffect(() => {
    getFundNotice(Number(match.params.num)).then((response) => {
      setNotices(response.data);
    });
  }, [params]);

  const payment_test = () => {
    IMP.init('imp09514011');

    IMP.request_pay(
      {
        pg: 'inicis', // version 1.1.0부터 지원.
        pay_method: 'card',
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '펀디 결제: ' + Fund?.fundingName,
        amount: money, //판매 가격
        buyer_email: 'iamport@siot.do',
        buyer_name: user.nickname,
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동 47 펀디타워',
        buyer_postcode: '123-456',
      },
      function (rsp: any) {
        if (rsp.success) {
          var msg = '결제가 완료되었습니다.';
          alert(msg);
          setPayment(token, Number(match.params.num), rsp.imp_uid, money);
          history.push('/mypage');
        } else {
          var msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;

          var urlBack = '/funding/detail/' + Fund?.fundingId;
          alert(msg);
          history.push(urlBack);
        }
      }
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <div></div>
      <div
        className="titleArea"
        style={{ height: '158px' }} //background: `url(${Fund?.fundingThumbnail})`}}
      >
        <h3 className="fundingTitle">{Fund?.fundingName}</h3>
        <h5 className="fundingSub">{Fund?.fundingSubtitle}</h5>
      </div>
      <div className="col-md-1"></div>
      <div className="col-md-10">
        <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '2em' }}>
          펀딩 결제하기
        </Box>
        <div className="row">
          <div className="col-md-6 imgArea">
            <CardMedia
              className="cardImg"
              component="img"
              alt="펀딩 카드 이미지"
              width="100%"
              image={Fund?.fundingThumbnail}
              title="Card Image"
            />
          </div>
          <div className="col-md-6">
            <Alert severity="error">
              반드시 펀딩 스토리와 공지사항을 숙지하고 후원에 참여해주세요!
            </Alert>
            <h3>펀딩: {Fund?.fundingName}</h3>
            <div className="noticetxt">
              본 펀딩은 마감일 기준 목표 달성률에 도달하지 못할 경우 결제 금액이
              전액 환불됩니다.
            </div>
            <div className="noticetxt">
              {' '}
              펀딩 목표 달성에 성공하였을 경우 펀딩 제작자에게 금액이 전달되고,
            </div>
            <div className="noticetxt">
              {' '}
              이후 펀디와의 연계를 통해 펀딩 진행 상황을 펀딩 공지사항으로
              안내드립니다.
            </div>
            <div className="noticetxt">
              {' '}
              해당 안내 사항에 동의 버튼을 눌러 펀딩을 진행할 수 있습니다.
            </div>

            <div style={{ fontSize: '20px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="checkedB"
                    checked={state.checkedB}
                    icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                    checkedIcon={<CheckBoxIcon fontSize="large" />}
                  />
                }
                label="본 안내 사항에 동의합니다."
              />
            </div>

            <TextField
              value={money}
              onChange={handlerMoney}
              label="후원금"
              type="number"
            ></TextField>
            <Button
              className="btn_main"
              variant="contained"
              onClick={payment_test}
            >
              후원하기
            </Button>
          </div>
        </div>

        <div>
          <FullWidthTabs
            detail={Fund?.fundingContent}
            notices={notices}
          ></FullWidthTabs>
        </div>
      </div>
    </div>
  );
};

export default FundPayment;
