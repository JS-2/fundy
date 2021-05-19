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
import { Grid, Paper, Box, Dialog, DialogContent, DialogProps } from '@material-ui/core';
import FundCard from '../components/FundCard';
import 'swiper/swiper.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper/core';
import { useHistory, withRouter } from 'react-router-dom';
import Banner from '../components/Banner';
import FundCreate from '../pages/funding/FundCreate';
import './Main.css';
import { getFundingList } from '../api/funding';
import { IFunding, FundingStatus, User, FundForm } from '../common/types';
import { useSelector } from 'react-redux';
import { rootState } from '../reducers';
import "./Funding.css";
import FundItem from '../components/FundItem';
import bannerTip from "../assets/img/bannerTip.png";
import bannerCreate from "../assets/img/bannerCreate.png";
import fundyTuto from '../assets/img/fundyTuto.png';

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

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [fundings, setFundings] = useState<IFunding[]>([]);
  const [failFundings, setFailFundings] = useState<IFunding[]>([]);
  const [fundingRank, setFundingRank] = useState<IFunding[]>([]);
  const [fundingStatus, setFundingStatus] = useState<FundingStatus>({
    page: 1,
    per_page: 1000,
    status: 2,
  });
  const [header, setHeader] = useState<string>('진행중인 펀딩');
  const user: User = useSelector((state: rootState) => state.userReducer.user);

  
  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    getFundingList(fundingStatus).then((resp) => {
      console.log(resp.data);
      setFundings(resp.data);
    });

    getFundingList({
      page: 1,
      per_page: 1000,
      status: 2,
    }).then((resp) => {
      console.log(resp.data);
      let data = resp.data;
      data = data.sort((a: FundForm, b: FundForm) => {
        const aAmount = Number(a.fundingParticipants);
        const bAmount = Number(b.fundingParticipants);
        if (aAmount === bAmount) {
          return a.fundingId - b.fundingId;
        } else {
          return bAmount - aAmount;
        }
      });
      setFundingRank(data.slice(0, 10));
    });
    
  }, [fundingStatus]);

  const handleWaitFunding = () => {
    setFundingStatus({
      page: 1,
      per_page: 1000,
      status: 1,
    });
    setHeader('대기중인 펀딩');
  };

  const handleProgressFunding = () => {
    setFundingStatus({
      page: 1,
      per_page: 1000,
      status: 2,
    });
    setHeader('진행중인 펀딩');
  };

  const handleEndFunding = () => {
    setFundingStatus({
      page: 1,
      per_page: 1000,
      status: 3,
    });
    setHeader('완료된 펀딩');
  };

  const loginRedirect = () => {
    alert("로그인 후 펀딩 제작이 가능합니다.");
    history.push({
      pathname: "/login",
      state: {},
    });
  };

  

  const createRedirect = () => {
    history.push({
      pathname: "funding/create",
      state: {},
    });
  };

  const handleNeedAcceptFunding = () => {
    setFundingStatus({
      page: 1,
      per_page: 1000,
      status: 0,
    });
    setHeader('승인 필요 펀딩');
  };
  const handleDeclineFunding = () => {
    setFundingStatus({
      page: 1,
      per_page: 1000,
      status: 4,
    });
    setHeader('거절된 펀딩');
  };
  const handleSuccessFunding = () => {
    setFundingStatus({
      page: 1,
      per_page: 1000,
      status: 5,
    });
    setHeader('성공한 펀딩');
  };
  const handleFailFunding = () => {
    setFundingStatus({
      page: 1,
      per_page: 1000,
      status: 6,
    });
    setHeader('실패한 펀딩');
  };

  const history = useHistory();
  const createClick = () => {
    history.push({
      pathname: '/funding/create',
      state: {},
    });
  };

  return (
    <div>
      
      <div id="bannerArea">
        <Banner></Banner>
      </div>
      
      <div className="row">
        <div className="col-md-1 col-sm-1"></div>
        <div className="col-md-10 col-sm-10">
          <div className="row">
            <div className="col-md-6" onClick={handleClickOpen('body')} style={{ padding:'5px' }}>
              <img src={bannerTip} style={{width:'100%', borderRadius:'10px'}}/>
            </div>
            <div className="col-md-6" onClick={user === null ? loginRedirect : createRedirect} style={{ padding:'5px'}}>
            <img src={bannerCreate} style={{width:'100%', borderRadius:'10px'}}/>
              </div>
          </div>
          <Dialog
          className="dialogClass"
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogContent className="dialog" dividers={scroll === 'paper'}>
            <div className="modalDiv">
              <img onClick={handleClose} width="100%" src={fundyTuto}></img>
            </div>
          </DialogContent>
        </Dialog>

          

      
          <Box
            mt={4}
            mb={3}
            className="nbg_bold font-smooth"
            style={{ fontSize: '2em' }}
          >
            {header}
          </Box>
          <Box mb={2}>
            <Button className="fundBtn" variant="contained" onClick={handleWaitFunding}>
              대기중인 펀딩
            </Button>
            <Button className="fundBtn" variant="contained" onClick={handleProgressFunding}>
              진행중인 펀딩
            </Button>
            <Button className="fundBtn" variant="contained" onClick={handleEndFunding}>
              완료된 펀딩
            </Button>
            {user !== null && user.role == 'ADMIN' ? (
              <>
                <Button className="fundBtn" variant="contained" onClick={handleNeedAcceptFunding}>
                  승인 필요 펀딩
                </Button>
                <Button className="fundBtn" variant="contained" onClick={handleDeclineFunding}>
                  거절된 펀딩
                </Button>
                <Button className="fundBtn" variant="contained" onClick={handleSuccessFunding}>
                  성공한 펀딩
                </Button>
                <Button className="fundBtn" variant="contained" onClick={handleFailFunding}>
                  실패한 펀딩
                </Button>
              </>
            ) : (
              <></>
            )}

            <Button className="fundCreateBtn" variant="contained" onClick={createClick}>
              펀딩 제작하기
            </Button>
          </Box>
          <Grid container spacing={3}>
            {fundings?.map((funding: IFunding, i: number) => (
              <div className="col-md-4"  style={{ padding: '10px' }} key={funding.fundingId}>
                <FundCard funding={funding}></FundCard>
              </div>
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
              <div className="col-lg-4" key={funding.fundingId}>
                <FundCard funding={funding}></FundCard>
              </div>
            ))
          ) : (
            <></>
          )}







  
<Box
            mt={4}
            mb={3}
            className="nbg_bold font-smooth"
            style={{ fontSize: '2em' }}
          >
            인기 펀딩
          </Box>
        <div style={{ padding: "0px" }}>
          {fundingRank?.map((funding: IFunding, i: number) => {
            return (
              <div
                className="col-md-4"
                style={{ marginBottom: "10px"}}
                key={funding.fundingId}
              >
                <FundCard funding={funding}></FundCard>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Funding;
