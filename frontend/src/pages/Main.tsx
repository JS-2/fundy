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
import { IFunding } from '../common/types';
import { getFundingList } from '../api/funding';

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

const Main = () => {
  const [hotFunding, setHotFunding] = useState<IFunding[]>();

  useEffect(() => {
    getFundingList().then((resp) => {
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
      setHotFunding(data.slice(0, 3));
    });
  }, []);

  return (
    <div>
      <div id="bannerArea">
        <Banner></Banner>
      </div>

      <div className="area" id="">
        <div className="" id="topFundArea">
          <h3 className="headText">인기 펀딩</h3>

          <Grid container spacing={3}>
            {hotFunding?.map((funding: IFunding) => {
              return (
                <Grid item xs={4}>
                  <FundCard funding={funding}></FundCard>
                </Grid>
              );
            })}
          </Grid>
        </div>

        <div className="" id="idolArea">
          <h3 className="headText">아이돌</h3>

          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <Card style={{ padding: '0', height: '600px', display: 'block' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="펀딩 카드 이미지"
                    height="400"
                    image="https://d1o7cxaf8di5ts.cloudfront.net/file/brand/182/1522221709550_624.PNG"
                    title="Card Image"
                  />
                  <CardContent style={{ padding: '5px' }}>
                    <Typography
                      gutterBottom
                      variant="h3"
                      component="h3"
                      style={{
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        width: 'inherit',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      태민
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      HOT ISSUE [ISSUE MAKER]을 메이크스타에서 구입하고 한정판
                      미공개 포토카드와 영상통화 기회를 놓치지 마세요!
                    </Typography>
                    <table style={{ width: '100%' }}>
                      <tr>
                        <td>
                          <p>302,230,230원</p>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <p>70%</p>
                        </td>
                      </tr>
                    </table>
                  </CardContent>
                </CardActionArea>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <Card style={{ padding: '0', height: '600px', display: 'block' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="펀딩 카드 이미지"
                    height="400"
                    image="https://d1o7cxaf8di5ts.cloudfront.net/file/project/singer_hotissue_01/info/hotissue_01_thumb_v2.png"
                    title="Card Image"
                  />
                  <CardContent
                    style={{ padding: '5px', backgroundColor: 'grey' }}
                  >
                    <Typography
                      gutterBottom
                      variant="h3"
                      component="h3"
                      style={{
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        width: 'inherit',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      태민
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      HOT ISSUE [ISSUE MAKER]을 메이크스타에서 구입하고 한정판
                      미공개 포토카드와 영상통화 기회를 놓치지 마세요!
                    </Typography>
                    <table style={{ width: '100%' }}>
                      <tr>
                        <td>
                          <p>302,230,230원</p>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <p>70%</p>
                        </td>
                      </tr>
                    </table>
                  </CardContent>
                </CardActionArea>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <Card style={{ padding: '0', height: '600px', display: 'block' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="펀딩 카드 이미지"
                    height="400"
                    image="https://d1o7cxaf8di5ts.cloudfront.net/file/project/singer_hotissue_01/info/hotissue_01_thumb_v2.png"
                    title="Card Image"
                  />
                  <CardContent
                    style={{ padding: '5px', backgroundColor: 'grey' }}
                  >
                    <Typography
                      gutterBottom
                      variant="h3"
                      component="h3"
                      style={{
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        width: 'inherit',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      태민
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      HOT ISSUE [ISSUE MAKER]을 메이크스타에서 구입하고 한정판
                      미공개 포토카드와 영상통화 기회를 놓치지 마세요!
                    </Typography>

                    <p>302,230,230원</p>

                    <p>70%</p>
                  </CardContent>
                </CardActionArea>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <Card style={{ padding: '0', height: '600px', display: 'block' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="펀딩 카드 이미지"
                    height="400"
                    image="https://d1o7cxaf8di5ts.cloudfront.net/file/project/singer_hotissue_01/info/hotissue_01_thumb_v2.png"
                    title="Card Image"
                  />
                  <CardContent
                    style={{ padding: '5px', backgroundColor: 'grey' }}
                  >
                    <Typography
                      gutterBottom
                      variant="h3"
                      component="h3"
                      style={{
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        width: 'inherit',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      태민
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      HOT ISSUE [ISSUE MAKER]을 메이크스타에서 구입하고 한정판
                      미공개 포토카드와 영상통화 기회를 놓치지 마세요!
                    </Typography>
                    <table style={{ width: '100%' }}>
                      <tr>
                        <td>
                          <p>302,230,230원</p>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <p>70%</p>
                        </td>
                      </tr>
                    </table>
                  </CardContent>
                </CardActionArea>
              </Card>
            </SwiperSlide>
          </Swiper>
        </div>
        <h3 className="headText">스토어</h3>
        <p>아이템 카드</p>
      </div>
    </div>
  );
};

export default Main;
