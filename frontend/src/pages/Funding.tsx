import React, { Component, useEffect, useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid, Paper, Box } from '@material-ui/core';
import FundCard from '../components/FundCard';
import 'swiper/swiper.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper/core';
import { useHistory, withRouter } from 'react-router-dom';
import Banner from '../components/Banner';
import FundCreate from '../pages/funding/FundCreate';
import './Main.css';
import { getFundingList } from '../api/funding';
import { IFunding, FundingStatus, User } from '../common/types';
import { useSelector } from 'react-redux';
import { rootState } from '../reducers';

SwiperCore.use([Navigation, Pagination, Scrollbar]);

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
      backgroundColor: '#1a90ff',
    },
  })
)(LinearProgress);

const Funding = () => {
  const [fundings, setFundings] = useState<IFunding[]>([]);
  const [failFundings, setFailFundings] = useState<IFunding[]>([]);
  const [fundingStatus, setFundingStatus] = useState<FundingStatus>({
    page: 1,
    per_page: 1000,
    status: 1,
    time: 1,
  });
  const [header, setHeader] = useState<string>('진행중인 펀딩');
  const user: User = useSelector((state: rootState) => state.userReducer.user);

  useEffect(() => {
    getFundingList(fundingStatus).then((resp) => {
      setFundings(resp.data);
    });
    if (fundingStatus.time === 2) {
      getFundingList({
        page: 1,
        per_page: 1000,
        status: 1,
        time: 3,
      }).then((resp) => {
        console.log('실패펀딩들', resp.data);
        setFailFundings(resp.data);
      });
    } else {
      setFailFundings([]);
    }
  }, [fundingStatus]);

  const handleWaitFunding = () => {
    setFundingStatus({
      page: 1,
      per_page: 1000,
      status: 1,
      time: 0,
    });
    setHeader('대기중인 펀딩');
  };

  const handleProgressFunding = () => {
    setFundingStatus({
      page: 1,
      per_page: 1000,
      status: 1,
      time: 1,
    });
    setHeader('진행중인 펀딩');
  };

  const handleEndFunding = () => {
    setFundingStatus({
      page: 1,
      per_page: 1000,
      status: 1,
      time: 2,
    });
    setHeader('완료된 펀딩');
  };

  const handleNeedAcceptFunding = () => {
    setFundingStatus({
      page: 1,
      per_page: 1000,
      status: 0,
      time: 1,
    });
    setHeader('승인 필요 펀딩');
  };
  const handleDeclineFunding = () => {
    setFundingStatus({
      page: 1,
      per_page: 1000,
      status: 2,
      time: 1,
    });
    setHeader('거절된 펀딩');
  };
const history = useHistory();
const createClick=()=>{
    history.push({
      pathname: "/funding/create",
      state: {},
    });
  };

  return (
    <div>
      <div id="bannerArea">
        <Banner></Banner>
      </div>
      <div className="row">
        <div className="col-md-1 col-sm-2"></div>
        <div className="col-md-10 col-sm-8">
          <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
            {header}
          </Box>
          <Box mb={2}>
            <Button variant="contained" onClick={handleWaitFunding}>
              대기중인 펀딩
            </Button>
            <Button variant="contained" onClick={handleProgressFunding}>
              진행중인 펀딩
            </Button>
            <Button variant="contained" onClick={handleEndFunding}>
              완료된 펀딩
            </Button>
            {user.role == 'ADMIN' ? (
              <>
                <Button variant="contained" onClick={handleNeedAcceptFunding}>
                  승인 필요 펀딩
                </Button>
                <Button variant="contained" onClick={handleDeclineFunding}>
                  거절된 펀딩
                </Button>
              </>
            ) : (
              <></>
            )}

            <Button variant="contained" onClick={createClick}>펀딩 제작하기</Button>         
             </Box>
          <Grid container spacing={3}>
            {fundings?.map((funding: IFunding, i: number) => (
              <Grid item xs={4} key={funding.fundingId}>
                <FundCard funding={funding}></FundCard>
              </Grid>
            ))}
          </Grid>
          {failFundings.length !== 0 ? (
            <Box
              mx={1}
              my={2}
              className="nbg_bold"
              style={{ fontSize: '1.2em' }}
            >
              실패한 펀딩
            </Box>
          ) : (
            <></>
          )}
          {failFundings.length !== 0 ? (
            failFundings?.map((funding: IFunding, i: number) => (
              <Grid item xs={4} key={funding.fundingId}>
                <FundCard funding={funding}></FundCard>
              </Grid>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Funding;
