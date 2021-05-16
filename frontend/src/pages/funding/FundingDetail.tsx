import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Modal } from '@material-ui/core';
import './FundingDetail.css';
import { getFundDetail, getFundNotice } from '../../api/fund';
import FullWidthTabs from '../../components/fundComponent/FullWidthTabs';
import { FundForm, FundingNotice, IFunding, User } from '../../common/types';
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom';
import { Height, PinDropSharp } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { rootState } from '../../reducers';
import { getFavoriteFunding, setFavoriteFunding } from '../../api/user';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      background:
        'linear-gradient(90deg, rgba(252,86,111,0.6225840678068102) 0%, rgba(252,86,111,1) 100%)',
    },
  })
)(LinearProgress);

interface MatchParams {
  num: string;
}




const FundingDetail = ({ match }: RouteComponentProps<MatchParams>) => {
  console.log(match.params.num);

  const [Fund, setFund] = useState<FundForm>();
  const [fundingFavorite, setFundingFavorite] = useState<boolean>(false);

  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  useEffect(() => {
    if (user === null) return;
    getFavoriteFunding(token).then((resp) => {
      const check = resp.data.find((e: IFunding) => {
        if (e.fundingId == Number(match.params.num)) {
          return true;
        }
      });
      if (check) setFundingFavorite(true);
      else setFundingFavorite(false);
    });
  }, [user]);

  const handleFavorite = () => {
    setFavoriteFunding(token, match.params.num, fundingFavorite).then(
      (resp) => {
        console.log('이건');
        setFundingFavorite(!fundingFavorite);
      }
    );
  };
  //.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const history = useHistory();
  const onClickPayment=()=>{

    const url = '/funding/detail/' + Fund?.fundingId + '/payment';
    history.push({
      pathname: url,
    });
  }

  


  interface Params {
    fund_id: string;
  }
  const params: Params = useParams();

  interface Props {
    fundInfo: FundForm | undefined;
  }
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [notices, setNotices] = useState<FundingNotice[]>([]);




  

  useEffect(() => {
    console.log('fundDetailPage');

    getFundDetail(Number(match.params.num)).then((response) => {
      console.log(response.data);
      setFund(response.data);
    });
  }, [params]);


  
  useEffect(() => {
    console.log('fundNotices Request');
    getFundNotice(Number(match.params.num)).then((response) => {
      console.log(response.data);
      setNotices(response.data);
    });
  }, [params]);




  console.log({ Fund });

  return (
    <div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
        <div
        className="fundingHeader"
        //style={{ background: `url(${Fund?.fundingThumbnail})`}}
      >
        <div className="none">
          {user === null ? (
            <></>
          ) : (
            <Button
              variant="contained"
              className="nbg_bold"
              color={fundingFavorite ? 'secondary' : 'default'}
              onClick={handleFavorite}
            >
              관심 {fundingFavorite ? '해제' : '등록'}
            </Button>
          )}
          <h3 className="fundingText">{Fund?.fundingName}</h3>
          <h5 className="fundingText">
            {Fund?.fundingSubtitle}
          </h5>
    

          <div className="row">
            <div className="col-md-8 imgArea">
              <img id="fundImg" width="100%" onClick={handleOpen} src={Fund?.fundingThumbnail}></img>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                  <div className="modalDiv">
                  <img onClick={handleClose} width="60%" src={Fund?.fundingThumbnail}></img>
                  </div>
              </Modal>
              
            </div>
            <div className="col-md-4 fundingInfo">
              <p>아이돌 이름: {Fund?.idolName}</p>

              <table style={{ width: '100%' }}>
                <tr>
                  <td style={{ textAlign: 'right' }}>
                    <h5>
                      목표 금액:{' '}{Fund?.fundingGoalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                    </h5>
                    <h5>
                      달성 금액:{' '}{Fund?.fundingAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>펀딩 이름:{Fund?.fundingName}</p>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <h3 className="fundRate">{Fund?.fundingAchievementRate}%</h3>
                  </td>
                </tr>
              </table>
              <BorderLinearProgress variant="determinate" value={Number(Fund?.fundingAchievementRate)} />

              <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                  <Button variant="contained" color="primary" onClick={onClickPayment}>
                    펀딩하기
                  </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <div>
        <FullWidthTabs detail={Fund?.fundingContent} notices={notices}></FullWidthTabs>
      </div>
    </div>

        </div>
      </div>
      
  );
};

export default FundingDetail;
