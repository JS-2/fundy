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
import FundCard from "../components/FundCard";
import "swiper/swiper.scss";
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper/core";
import { withRouter } from "react-router-dom";
import Banner from "../components/Banner";
import FundCreate from "../pages/funding/FundCreate";
import "./Main.css";

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
            <div className="">
              <h3 className="headText">인기 펀딩 목록</h3>
              <Box display="flex" justifyContent="flex-end">
              <a id="logoAnchor" href="/funding/create">
                <Button variant="contained" color="primary">
                  펀딩 신청하기
                </Button>
              </a>
              </Box>
            </div>
            </div>
            <div className="row">

            <Grid container spacing={3}>
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
          <hr></hr>
          <br></br><br></br><br></br>
         
          <br></br><br></br><br></br>


          <div className="" id="topFundArea">
            <div className="">
              <h3 className="headText">신규 펀딩 목록</h3>
              <Box display="flex" justifyContent="flex-end">
              <a id="logoAnchor" href="/funding/create">
                <Button variant="contained" color="primary">
                  펀딩 신청하기
                </Button>
              </a>
              </Box>
            </div>
            </div>
            <div className="row">

            <Grid container spacing={3}>
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
