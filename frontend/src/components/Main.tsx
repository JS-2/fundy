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
import { Grid, Paper } from "@material-ui/core";
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

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

class Main extends Component {
  render() {
    return (
      <div>
        <h3> 메인 페이지</h3>
        <div>
      <Paper square elevation={0}>
        <Typography>{tutorialSteps[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>

        <div>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper>xs</Paper>
            </Grid>
            <Grid item xs>
              <Paper>xs</Paper>
            </Grid>
            <Grid item xs>
              <Paper>xs</Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper>xs</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>xs=6</Paper>
            </Grid>
            <Grid item xs>
              <Paper>xs</Paper>
            </Grid>
          </Grid>
        </div>

        <div className="col-md-12" id="banner">
          {" "}
          배너영역
        </div>
        <div className="Container">
          <div className="row"></div>
          <h3>인기 펀딩</h3>
          <Card style={{ padding: "0", height: "400px" }} className="col-md-4">
            <CardActionArea>
              <CardMedia
                component="img"
                alt="펀딩 카드 이미지"
                height="200"
                image="https://d1o7cxaf8di5ts.cloudfront.net/file/project/singer_hotissue_01/info/hotissue_01_thumb_v2.png"
                title="Card Image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h5">
                  싸피싸피 데뷔 1주년 기념 펀딩
                </Typography>
                <Chip color="primary" label="D-12" />
                <Typography variant="body2" color="textSecondary" component="p">
                  HOT ISSUE [ISSUE MAKER]을 메이크스타에서 구입하고 한정판
                  미공개 포토카드와 영상통화 기회를 놓치지 마세요!
                </Typography>
                <BorderLinearProgress variant="determinate" value={50} />
              </CardContent>
            </CardActionArea>
          </Card>
          <p>펀딩 카드</p> <p>펀딩 카드</p>
          <h3>아이돌</h3>
          <p>아이돌 카드</p> <p>아이돌 카드</p> <p>아이돌 카드</p>
          <h3>스토어</h3>
          <p>펀딩 카드</p> <p>펀딩 카드</p> <p>펀딩 카드</p>
        </div>
      </div>
    );
  }
}

export default Main;
