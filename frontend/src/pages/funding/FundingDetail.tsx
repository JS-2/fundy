import React, { useEffect, useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
  withStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid, Paper, Box } from '@material-ui/core';
import './FundingDetail.css';
import { getFundDetail } from '../../api/fund';
import FullWidthTabs from '../../components/fundComponent/FullWidthTabs';
import { FundForm, IFunding, User } from '../../common/types';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Height } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { rootState } from '../../reducers';
import { getFavoriteFunding, setFavoriteFunding } from '../../api/user';

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

  useEffect(() => {
    if (user === null) return;
    getFavoriteFunding(user.user_id).then((resp) => {
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
    setFavoriteFunding(
      user.user_id,
      Number(match.params.num),
      fundingFavorite
    ).then((resp) => {
      setFundingFavorite(!fundingFavorite);
    });
  };

  interface Params {
    fund_id: string | undefined;
  }
  const params: Params = useParams();

  interface Props {
    fundInfo: FundForm | undefined;
  }

  useEffect(() => {
    console.log('fundDetailPage');

    getFundDetail(Number(match.params.num)).then((response) => {
      console.log(response.data);
      setFund(response.data);
    });
  }, [params]);

  console.log({ Fund });

  return (
    <div>
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
            {Fund?.fundShortInfo}
          </h5>
    

          <div className="row">
            <div className="col-md-8 imgArea">
              <img id="fundImg" width="100%" src={Fund?.fundingThumbnail}></img>
            </div>
            <div className="col-md-4 fundingInfo">
              <p>아이돌 이름: {Fund?.idolName}</p>
              

              <table style={{ width: '100%' }}>
                <tr>
                  <td style={{ textAlign: 'right' }}>
                    <h5>
                      목표금액:
                      {Fund?.fundingGoalAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      원
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>펀딩 이름:{Fund?.fundingName}</p>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <h3 className="fundRate">70%</h3>
                  </td>
                </tr>
              </table>
              <BorderLinearProgress variant="determinate" value={70} />

              <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                <a id="logoAnchor" href="1234/payment">
                  <Button variant="contained" color="primary">
                    펀딩하기
                  </Button>
                </a>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <div>
        <FullWidthTabs detail={Fund?.fundingContent}></FullWidthTabs>
      </div>
    </div>
  );
};

export default FundingDetail;
