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

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <FundCard funding={null}></FundCard>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Funding;
