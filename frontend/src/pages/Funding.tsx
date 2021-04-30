import React, { Component } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Grid, Paper, Box } from "@material-ui/core";
import FundCard from "../components/Fundcard";
import "swiper/swiper.scss";
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper/core';
import { withRouter } from 'react-router-dom';
import Banner from "../components/Banner";
import FundCreate from "../pages/funding/FundCreate";

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
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  })
)(LinearProgress);



class Funding extends Component {
  render() {
    return (
      <div>
        <div id="bannerArea">
          <Banner></Banner>
        </div>

      

        <div className="area" id="">

        <div className="" id="topFundArea">
       
          <h3 id="headText">펀딩 목록</h3>

          <button > 펀딩 작성하기<a id="logoAnchor" href="/funding/create">sss</a></button>

          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Card style={{ padding: "0", height: "400px", display: "block" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="펀딩 카드 이미지"
                    height="200"
                    image="https://d1o7cxaf8di5ts.cloudfront.net/file/project/singer_hotissue_01/info/hotissue_01_thumb_v2.png"
                    title="Card Image"
                  />
                  <CardContent style={{ padding: "5px" }}>
                    <Chip color="primary" label="D-12" />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h6"
                      style={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        width: "inherit",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      2021 싸피싸피 데뷔 1주년 기념 펀딩입니다
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      HOT ISSUE [ISSUE MAKER]을 메이크스타에서 구입하고 한정판
                      미공개 포토카드와 영상통화 기회를 놓치지 마세요!
                    </Typography>
                    <table style={{ width: "100%" }}>
                      <tr>
                        <td>
                          <p>302,230,230원</p>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <p>70%</p>
                        </td>
                      </tr>
                    </table>

                    <BorderLinearProgress variant="determinate" value={70} />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card style={{ padding: "0", height: "400px", display: "block" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="펀딩 카드 이미지"
                    height="200"
                    image="https://d1o7cxaf8di5ts.cloudfront.net/file/project/singer_hotissue_01/info/hotissue_01_thumb_v2.png"
                    title="Card Image"
                  />
                  <CardContent style={{ padding: "5px" }}>
                    <Chip color="primary" label="D-12" />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h6"
                      style={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        width: "inherit",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      2021 싸피싸피 데뷔 1주년 기념 펀딩입니다
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      HOT ISSUE [ISSUE MAKER]을 메이크스타에서 구입하고 한정판
                      미공개 포토카드와 영상통화 기회를 놓치지 마세요!
                    </Typography>
                    <table style={{ width: "100%" }}>
                      <tr>
                        <td>
                          <p>302,230,230원</p>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <p>70%</p>
                        </td>
                      </tr>
                    </table>

                    <BorderLinearProgress variant="determinate" value={70} />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <FundCard></FundCard>
            </Grid>
            <Grid item xs={4}>
              <FundCard></FundCard>
            </Grid>
            <Grid item xs={4}>
              <FundCard></FundCard>
            </Grid>
            <Grid item xs={4}>
              <FundCard></FundCard>
            </Grid>
            <Grid item xs={4}>
              <FundCard></FundCard>
            </Grid>
            <Grid item xs={4}>
              <FundCard></FundCard>
            </Grid>
          </Grid>

          </div>


        </div>
      </div>
    );
  }
}

export default Funding;
