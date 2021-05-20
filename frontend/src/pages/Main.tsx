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
import { FundForm, FundingForm, Idol, IFunding } from '../common/types';
import { getFundingList, getFundingRank } from '../api/funding';
import { getAllIdolList } from '../api/idol';
import IdolCard from '../components/IdolCard';
import { Link } from 'react-router-dom';
import FundItem from '../components/FundItem';
import { BorderLeft } from '@material-ui/icons';
import rankBanner from '../assets/img/a.png';
import FundBanner from '../components/fundComponent/FunBanner';

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
  const [fundingRank, setFundingRank] = useState<IFunding[]>([]);
  const [randomIdols, setRandomIdols] = useState<Idol[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 10);
    getAllIdolList().then((resp) => {
      let data = resp.data;
      shuffle(data);
      setRandomIdols(data.slice(0, 8));
    });

    getFundingList({
      page: 1,
      per_page: 1000,
      status: 2,
      keyword: '',
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

    getFundingList({
      page: 1,
      per_page: 1000,
      status: 2,
      keyword: '',
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
      setFundingRank(data.slice(0, 7));
    });
  }, []);

  return (
    <div
      style={{
        minHeight: '500px',
        opacity: show ? 1 : 0,
        transition: 'all 0.5s ease-in-out',
      }}
    >
      <div id="bannerArea">
        <div style={{ minHeight: '500px' }}>
          <Banner />
        </div>
      </div>
  
      
      <div className="col-md-12">
        <div className="row justify-content-center" style={{margin: 'auto'}}>
        <div className="col-md-1  " id="" style={{height:'10px'}}></div>

          <div className="area col-md-10  " id="">
          <FundBanner></FundBanner>
            <div className="col-md-8 divA" id="topFundArea" >
              <div className="" style={{ marginRight: '20px' }}>
              <div
              className="nbg_bold font-smooth"
              style={{ fontSize: '2em' }}
            >
              펀디가 추천하는 오늘의 펀딩
            </div>
            <Box
              mb={3}
              className="font-smooth"
              style={{ fontSize: '1.2em', marginTop:'10px' }}
            >
              
            </Box>
              </div>

              <Grid
                container
                spacing={3}
             
              >
                {hotFunding?.map((funding: IFunding, i: number) => {
                  return (
                    <div className="col-md-6 col-sm-12 col-xs-12"
                      key={funding.fundingId}
                      style={{ padding: '10px' }}
                    >
                      <FundCard funding={funding}></FundCard>
                    </div>
                  );
                })}
              </Grid>
              <Box mt={1} className="boxbox" display="flex" justifyContent="flex-end" style={{marginTop:'50px'}}>
                <Link className="nbg" to="/funding">
                  더보기
                </Link>
              </Box>
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12 divB" style={{ paddingLeft: '20px' , height:'100%'}}>
              <div className="">
                <Box
              mb={3}
              className="nbg_bold font-smooth"
              style={{ fontSize: '2em' }}
            >
              펀디 인기 펀딩 Top 7
            </Box>
              </div>

              <div style={{ padding: '0px' }}>
                {fundingRank?.map((funding: IFunding, i: number) => {
                  return (
                    <div
                      className="fundDiv col-md-12"
                      style={{ height: '130px', width: '100%', marginBottom: '10px', display:'inline-block' }}
                      key={funding.fundingId}

                    >
                      <FundItem funding={funding} rank={i}></FundItem>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="area col-md-1  " id=""></div>
      
        </div>

        <div className="row" id="idolArea">
          <div className="col-md-1"></div>
          <div className="col-md-10 ">
          <div className="col-md-12">
            <div
        
              className="nbg_bold font-smooth"
              style={{ fontSize: '2em' }}
            >
              아이돌
            </div>
            <Box
              mb={3}
              className="font-smooth"
              style={{ fontSize: '1.2em', marginTop:'10px' }}
            >
              당신의 아이돌의 기부 현황을 알아보세요
            </Box>
            </div>
           
          </div>
        </div>
        <Swiper
              spaceBetween={10}
              slidesPerView={3.3}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              style={{ height: '350px' }}
            >
              {randomIdols.map((idol) => (
                <SwiperSlide key={idol.idolId}>
                  <IdolCard idol={idol} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="col-md-1"></div>
            <div className="col-md-10">
            <Box mt={1} className="boxbox" display="flex" justifyContent="flex-end" style={{marginTop:'50px'}}>


<Link className="nbg linkBtn" to="/idol" >
  더보기
</Link>

</Box>

            </div>
      

      </div>
    </div>
  );
};

export default Main;
