import React, { Component } from "react";

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
import "swiper/swiper.scss";
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper/core";
import { withRouter } from "react-router-dom";



class FundPayment extends Component {
  render() {
    return (
      <div>

        <h4>펀딩 결제하기</h4>
        <img src="https://d1o7cxaf8di5ts.cloudfront.net/file/project/singer_hotissue_01/info/hotissue_01_thumb_v2.png"/>


       
      </div>
    );
  }
}

export default FundPayment;
