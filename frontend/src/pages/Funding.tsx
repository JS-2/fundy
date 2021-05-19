import React, { Component, useEffect, useRef, useState } from 'react';
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
import {
  Grid,
  Paper,
  Box,
  CircularProgress,
  TextField,
} from '@material-ui/core';
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
import './Funding.css';
import FundItem from '../components/FundItem';

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
  const [fundingRank, setFundingRank] = useState<IFunding[]>([]);
  const [fundingStatus, setFundingStatus] = useState<FundingStatus>({
    page: 1,
    per_page: 3,
    status: 2,
    keyword: '',
  });
  const [header, setHeader] = useState<string>('진행중인 펀딩');
  const user: User = useSelector((state: rootState) => state.userReducer.user);

  const [isBottom, setIsBottom] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const containerRef = useRef(null);
  const [delay, setDelay] = useState<number>(600);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');

  function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      if (delay === null) {
        return;
      }

      const id = setInterval(() => savedCallback.current(), delay);

      return () => clearInterval(id);
    }, [delay]);
  }

  useInterval(
    () => {
      setFundingStatus({
        ...fundingStatus,
        per_page: fundingStatus.per_page + 3,
      });
    },
    isPlaying ? delay : null
  );

  useEffect(() => {
    if (isBottom) {
      setLoading(true);
      setPlaying(true);
    } else {
      setLoading(false);
      setPlaying(false);
    }
  }, [isBottom]);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  const callback = (entries: any) => {
    const [entry] = entries;
    setIsBottom(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (containerRef.current) {
      observer.observe(containerRef.current!);
    }
    return () => observer && observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    getFundingList({
      page: 1,
      per_page: 1000,
      status: 2,
      keyword: '',
    }).then((resp) => {
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
      setFundingRank(data.slice(0, 3));
    });
  }, []);

  useEffect(() => {
    getFundingList(fundingStatus).then((resp) => {
      if (resp.data.length === fundings.length) {
        setIsEnd(true);
      }
      setFundings(resp.data);
    });
  }, [fundingStatus]);

  const handleWaitFunding = () => {
    setIsEnd(false);
    setSearchWord('');
    setFundingStatus({
      page: 1,
      per_page: 3,
      status: 1,
      keyword: '',
    });
    setHeader('대기중인 펀딩');
  };

  const handleProgressFunding = () => {
    setIsEnd(false);
    setSearchWord('');
    setFundingStatus({
      page: 1,
      per_page: 3,
      status: 2,
      keyword: '',
    });
    setHeader('진행중인 펀딩');
  };

  const handleEndFunding = () => {
    setIsEnd(false);
    setSearchWord('');
    setFundingStatus({
      page: 1,
      per_page: 3,
      status: 3,
      keyword: '',
    });
    setHeader('완료된 펀딩');
  };

  const handleNeedAcceptFunding = () => {
    setIsEnd(false);
    setSearchWord('');
    setFundingStatus({
      page: 1,
      per_page: 3,
      status: 0,
      keyword: '',
    });
    setHeader('승인 필요 펀딩');
  };
  const handleDeclineFunding = () => {
    setIsEnd(false);
    setSearchWord('');
    setFundingStatus({
      page: 1,
      per_page: 3,
      status: 4,
      keyword: '',
    });
    setHeader('거절된 펀딩');
  };
  const handleSuccessFunding = () => {
    setIsEnd(false);
    setSearchWord('');
    setFundingStatus({
      page: 1,
      per_page: 3,
      status: 5,
      keyword: '',
    });
    setHeader('성공한 펀딩');
  };
  const handleFailFunding = () => {
    setIsEnd(false);
    setSearchWord('');
    setFundingStatus({
      page: 1,
      per_page: 3,
      status: 6,
      keyword: '',
    });
    setHeader('실패한 펀딩');
  };

  const handleSearch = () => {
    console.log(searchWord);
    setIsEnd(false);
    setFundingStatus({ ...fundingStatus, per_page: 3, keyword: searchWord });
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
          <Box
            mt={4}
            mb={3}
            className="nbg_bold font-smooth"
            style={{ fontSize: '2em' }}
          >
            인기 펀딩
          </Box>
          <Grid container spacing={3}>
            {fundingRank?.map((funding: IFunding, i: number) => {
              return (
                <Grid item xs={4} style={{ padding: '10px' }}>
                  <FundCard funding={funding}></FundCard>
                </Grid>
              );
            })}
          </Grid>

          <Button
            className="fundCreateBtn"
            variant="contained"
            onClick={createClick}
          >
            펀딩 제작하기
          </Button>
          <Box
            mt={4}
            mb={3}
            className="nbg_bold font-smooth"
            style={{ fontSize: '2em' }}
          >
            {header}
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box>
              <Button
                className="fundBtn"
                variant="contained"
                onClick={handleWaitFunding}
              >
                대기중인 펀딩
              </Button>
              <Button
                className="fundBtn"
                variant="contained"
                onClick={handleProgressFunding}
              >
                진행중인 펀딩
              </Button>
              <Button
                className="fundBtn"
                variant="contained"
                onClick={handleEndFunding}
              >
                완료된 펀딩
              </Button>
              {user !== null && user.role == 'ADMIN' ? (
                <>
                  <Button
                    className="fundBtn"
                    variant="contained"
                    onClick={handleNeedAcceptFunding}
                  >
                    승인 필요 펀딩
                  </Button>
                  <Button
                    className="fundBtn"
                    variant="contained"
                    onClick={handleDeclineFunding}
                  >
                    거절된 펀딩
                  </Button>
                  <Button
                    className="fundBtn"
                    variant="contained"
                    onClick={handleSuccessFunding}
                  >
                    성공한 펀딩
                  </Button>
                  <Button
                    className="fundBtn"
                    variant="contained"
                    onClick={handleFailFunding}
                  >
                    실패한 펀딩
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              style={{ width: '600px', paddingBottom: '30px' }}
            >
              <TextField
                variant="outlined"
                value={searchWord}
                className="searchArea"
                onChange={(e) => {
                  setSearchWord(e.target.value);
                }}
                inputProps={{
                  style: {
                    fontSize: '1.5em',
                    height: '10px',
                    borderRadius: '20px',
                  },
                }}
                style={{
                  paddingRight: '5px',
                  width: '400px',
                  borderRadius: '20px',
                }}
              ></TextField>
              <Button
                className="ml-2 btn_main"
                disableElevation
                variant="contained"
                onClick={handleSearch}
                style={{ fontSize: '1.4em' }}
              >
                {' '}
                검색{' '}
              </Button>
            </Box>
          </Box>
          <Box
            mt={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{
              height: fundings.length === 0 ? '400px' : '0px',
            }}
          >
            <Box
              fontSize="3em"
              color="silver"
              className="nbg_bold font-smooth"
              style={{
                transition: 'opacity 0.5s ease-in-out',
                visibility: fundings.length === 0 ? 'visible' : 'hidden',
                opacity: fundings.length === 0 ? 1 : 0,
              }}
            >
              검색에 맞는 펀딩을 찾을 수 없습니다.
            </Box>
          </Box>
          <Grid container spacing={3}>
            {fundings?.map((funding: IFunding, i: number) => (
              <div
                className="col-md-4"
                style={{ padding: '10px' }}
                key={funding.fundingId}
              >
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
        </div>
      </div>

      <div ref={containerRef}> </div>
      <Box mt={10} display="flex" justifyContent="center">
        <CircularProgress
          style={{
            height: !isEnd && loading ? '50px' : '0px',
            opacity: !isEnd && loading ? 1 : 0,
            transition: 'height 0.5s ease-in-out, opacity 0.5s ease-in-out',
          }}
        />
      </Box>
    </div>
  );
};

export default Funding;
