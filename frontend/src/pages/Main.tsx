import React, { Component, useEffect, useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid, Paper, Box } from '@material-ui/core';
import FundCard from '../components/FundCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper/core';
import './Main.css';
import Banner from '../components/Banner';
import { Idol, IFunding } from '../common/types';
import { getFundingList } from '../api/funding';
import { getAllIdolList } from '../api/idol';
import IdolCard from '../components/IdolCard';
import { Link } from 'react-router-dom';
import FundItem from '../components/FundItem';

// Install modules
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

function shuffle(a: Idol[]) {
  let j, x, i;
  for (let i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}
const Main = () => {
  const [hotFunding, setHotFunding] = useState<IFunding[]>([]);
  const [randomIdols, setRandomIdols] = useState<Idol[]>([]);

  useEffect(() => {
    getAllIdolList().then((resp) => {
      let data = resp.data;
      shuffle(data);
      setRandomIdols(data.slice(0, 8));
    });
    getFundingList({
      page: 1,
      per_page: 1000,
      status: 2,
    }).then((resp) => {
      console.log(resp.data);
      let data = resp.data;
      data = data.sort((a: IFunding, b: IFunding) => {
        const aAmount = Number(a.fundingAmount.replace(',', ''));
        const bAmount = Number(b.fundingAmount.replace(',', ''));
        if (aAmount === bAmount) {
          return a.fundingId - b.fundingId;
        } else {
          return bAmount - aAmount;
        }
        
      });
      setHotFunding(data.slice(0, 6));
    });
  }, []);

  return (
    <div>
      <div id="bannerArea">
        <Banner></Banner>
      </div>
      <div className="row">
        <div className="col-md-1"></div>

        <div className="area col-md-10" id="">
          <div className="col-md-8 divA" id="topFundArea">
            <span className="headText">펀딩</span>
            <Box mt={1} display="flex" justifyContent="flex-end" style={{marginBottom:"8px"}}>
              <Link className="nbg" to="/funding">
                더보기
              </Link>
            </Box>

            <Grid container spacing={3}>
              {hotFunding?.map((funding: IFunding, i: number) => {
                return (
                  <Grid item xs={6} key={funding.fundingId} style={{padding:"20px"}}>
                    <FundCard funding={funding}></FundCard>
                  </Grid>
                );
              })}
            </Grid>
            
          </div>
          <div className="col-md-4 divB">
          <span className="headText">인기 순위</span>
          <Box mt={1} display="flex" justifyContent="flex-end" style={{marginBottom:"20px"}}>
              <Link className="nbg" to="/funding">
                더보기
              </Link>
            </Box>
          <Grid container spacing={3} style={{border:"lightgrey 1px solid", padding:"10px"}}>
              {hotFunding?.map((funding: IFunding, i: number) => {
                return (
                  <div className="col-md-12 fundDiv" style={{height:"80px", marginBottom:"4px"}} key={funding.fundingId}>
                    <FundItem funding={funding} rank={i}></FundItem>
                
                  </div>
                  
                );
              })}
            </Grid>
          
          </div>
          </div>
          
        </div>



          <div className="row" id="idolArea">
            <div className="col-md-1"></div>
            <div className="col-md-10 divA moveA">
            <h3 className="headText">아이돌</h3>
            <Swiper
              spaceBetween={-380}
              slidesPerView={3}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {randomIdols.map((idol) => (
                <SwiperSlide key={idol.idolId}>
                  <IdolCard idol={idol} />
                </SwiperSlide>
              ))}
            </Swiper>
            <Box mt={1} display="flex" justifyContent="flex-end">
              <Link className="nbg" to="/idol">
                더보기
              </Link>
            </Box>

            </div>
         
          </div>

          <div data-aos="zoom-in-up">
            {' '}
            <p>안녕안녕</p>
          </div>
  
      </div>

  );
};

export default Main;
