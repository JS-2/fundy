import React, { useEffect, useState } from "react";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import ScheduleIcon from '@material-ui/icons/Schedule';
import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  DialogProps,
  Grid,
  IconButton,
  Modal,
  SvgIcon,
} from "@material-ui/core";
import "./FundingDetail.css";
import { getFundDetail, getFundNotice } from "../../api/fund";
import FullWidthTabs from "../../components/fundComponent/FullWidthTabs";
import { FundForm, FundingNotice, IFunding, User } from "../../common/types";
import { RouteComponentProps, useHistory, useParams } from "react-router-dom";
import { Group, Height, PinDropSharp } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { rootState } from "../../reducers";
import { getFavoriteFunding, setFavoriteFunding } from "../../api/user";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import kHeartIcon from "../../assets/img/hand-gesture.svg";
import GroupIcon from "@material-ui/icons/Group";
import TodayIcon from "@material-ui/icons/Today";
import {
  approveFunding,
  completeFunding,
  declineFunding,
} from "../../api/funding";
import LockIcon from '@material-ui/icons/Lock';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styles from '../../components/mypage/mypage/Profile.module.css';
import classNames from 'classnames';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import certBanner from '../../assets/img/cert.png'
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
      background:
        "linear-gradient(90deg, rgba(252,86,111,0.6225840678068102) 0%, rgba(252,86,111,1) 100%)",
    },
  })
)(LinearProgress);

interface MatchParams {
  num: string;
}

const FundingDetail = ({ match }: RouteComponentProps<MatchParams>) => {
  console.log(match.params.num);

  const [Fund, setFund] = useState<FundForm>();
  const [fundingFavorite, setFundingFavorite] = useState<boolean>(false);
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const [percentage, setPercentage] = useState<number>();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleClickOpen2 = (scrollType: DialogProps["scroll"]) => () => {
    setOpen2(true);
    setScroll(scrollType);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  useEffect(() => {
    if (user === null) return;
    getFavoriteFunding(token).then((resp) => {
      const check = resp.data.find((e: IFunding) => {
        if (e.fundingId == Number(match.params.num)) {
          return true;
        }
      });
      if (check) setFundingFavorite(true);
      else setFundingFavorite(false);
    });
  }, [user]);

  const handleFavorite = () => {
    setFavoriteFunding(token, match.params.num, fundingFavorite).then(
      (resp) => {
        setFundingFavorite(!fundingFavorite);
      }
    );
  };
  //.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const history = useHistory();
  const onClickPayment = () => {
    const url = "/funding/detail/" + Fund?.fundingId + "/payment";
    history.push({
      pathname: url,
    });
  };

  interface Params {
    fund_id: string;
  }
  const params: Params = useParams();

  interface Props {
    fundInfo: FundForm | undefined;
  }

  const handleApproveBtn = () => {
    let isGood = window.confirm("good 펀딩으로 지정하시겠습니까?");
    approveFunding(Fund!.fundingId, isGood ? "Y" : "N", token).then(() => {
      window.location.reload();
    });
  };

  const handleDeclineBtn = () => {
    declineFunding(Fund!.fundingId, token).then(() => {
      window.location.reload();
    });
  };

  const handleCompleteBtn = () => {
    completeFunding(Fund!.fundingId, token).then(() => {
      window.location.reload();
    });
  };
  const [notices, setNotices] = useState<FundingNotice[]>([]);

  useEffect(() => {
    console.log("fundDetailPage");

    getFundDetail(Number(match.params.num)).then((response) => {
      console.log(">>>>" + response.data);
      setFund(response.data);
    });

    if (Fund?.fundingAchievementRate != null) {
      if (Number(Fund?.fundingAchievementRate) >= 100) {
        setPercentage(100);
      } else setPercentage(Number(Fund?.fundingAchievementRate));
    }
  }, [params]);

  useEffect(() => {
    console.log("fundNotices Request");
    getFundNotice(Number(match.params.num)).then((response) => {
      console.log(response.data);
      setNotices(response.data);
    });
  }, [params]);

  console.log({ Fund });
  const loginRedirect = () => {
    history.push({
      pathname: "/login",
      state: {},
    });
  };

  const goToIdol = () => {
    const idolUrl = "/idol/" + Fund?.idolId;
    history.push({
      pathname: idolUrl,
      state: {},
    });
  };

  const startdate = Fund?.fundingStartTime?.replaceAll("-", ".").split("T", 1);
  const enddate = Fund?.fundingEndTime?.replaceAll("-", ".").split("T", 1);

  const disableBtn = (text: string) => {
    return (
      <Button
        startIcon={<SentimentVeryDissatisfiedIcon />}
        className="paybtn col-md-12 col-sm-12 col-xs-12"
        variant="contained"
        color="secondary"
        size="large"
        disabled
      >
        {text}
      </Button>
    );
  };

  const doubleBtn = (
    text1: string,
    text2: string,
    func1: () => void,
    func2: () => void,
    icon1: any,
    icon2: any,
    color1: "inherit" | "default" | "primary" | "secondary" | undefined,
    color2: "inherit" | "default" | "primary" | "secondary" | undefined
  ) => {
    return (
      <>
        <Button
          startIcon={icon1}
          variant="outlined"
          className="favbtn nbg_bold col-md-6 col-sm-6 col-xs-6 overlayLeftBtn"
          color={color1}
          onClick={func1}
        >
          {text1}
        </Button>

        <Button
          startIcon={icon2}
          className="paybtn col-md-6 col-sm-6 col-xs-6  circleScaleBtn"
          variant="contained"
          color={color2}
          size="large"
          onClick={func2}
        >
          {text2}
        </Button>
      </>
    );
  };

  const singleBtn = (text: string, func: () => void, icon: any) => {
    return (
      <>
        <Button
          startIcon={icon}
          className="paybtn col-md-12 col-sm-12 col-xs-12"
          variant="contained"
          color="secondary"
          size="large"
          onClick={func}
        >
          {text}
        </Button>
      </>
    );
  };

  const buttonRender = () => {
    if (user === null) {
      return disableBtn("로그인을 해주세요.");
    } else if (Fund?.fundingConfirm === "ApproveIng") {
      if (user.role === "ADMIN") {
        return disableBtn("진행중인 펀딩");
      } else {
        return doubleBtn(
          fundingFavorite ? "관심 해제" : "관심 등록",
          "펀딩하기",
          user === null ? loginRedirect : handleFavorite,
          user === null ? loginRedirect : onClickPayment,
          fundingFavorite ? (
            <FavoriteIcon color="secondary" />
          ) : (
            <FavoriteBorderIcon color="secondary" />
          ),
          <CreditCardIcon />,
          "default",
          "secondary"
        );
      }
    } else if (Fund?.fundingConfirm === "ApprovePre") {
      return disableBtn("펀딩 시작전입니다.");
    } else if (Fund?.fundingConfirm === "ApprovePost") {
      if (user.role === "ADMIN") {
        return singleBtn(
          "펀딩 완료",
          handleCompleteBtn,
          <SentimentVerySatisfiedIcon />
        );
      } else {
        return disableBtn("기간이 끝난 펀딩입니다.");
      }
    } else if (Fund?.fundingConfirm === "Wait") {
      if (user.role === "ADMIN") {
        return doubleBtn(
          "승인",
          "거절",
          handleApproveBtn,
          handleDeclineBtn,
          <SentimentVerySatisfiedIcon />,
          <SentimentVeryDissatisfiedIcon />,
          fundingFavorite ? "secondary" : "default",
          "secondary"
        );
      } else {
        return disableBtn("승인 대기중");
      }
    } else if (Fund?.fundingConfirm === "Decline") {
      return disableBtn("승인 거절한 펀딩입니다.");
    } else {
      return disableBtn("완료 처리된 펀딩입니다.");
    }

    if (Fund?.fundingConfirm === "Success" || Fund?.fundingConfirm === "Fail") {
      return disableBtn("기간이 끝난 펀딩입니다.");
    } else if (Fund?.fundingConfirm === "Decline") {
      return disableBtn("거절된 펀딩");
    } else if (Fund?.fundingConfirm === "Wait") {
    } else if (Fund?.fundingConfirm === "Approve") {
      if (user.role === "ADMIN") {
        // if (isTimeOver) {
        //   return singleBtn(
        //     '펀딩 완료',
        //     handleCompleteBtn,
        //     <SentimentVerySatisfiedIcon />
        //   );
        // } else {
        //   return disableBtn('진행중인 펀딩');
        // }
      } else {
        return doubleBtn(
          fundingFavorite ? "관심 해제" : "관심 등록",
          "펀딩하기",
          user === null ? loginRedirect : handleFavorite,
          user === null ? loginRedirect : onClickPayment,
          fundingFavorite ? (
            <FavoriteIcon color="secondary" />
          ) : (
            <FavoriteBorderIcon color="secondary" />
          ),
          <CreditCardIcon />,
          "default",
          "secondary"
        );
      }
    }
  };

  console.log(token);
  return (
    <div>
      <div
        className="titleArea"
        style={{ height: "158px" }} //background: `url(${Fund?.fundingThumbnail})`}}
      >
        <h3 className="fundingTitle">{Fund?.fundingName}</h3>
        <h5 className="fundingSub">{Fund?.fundingSubtitle}</h5>
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <div
            className="fundingHeader"
            //style={{ background: `url(${Fund?.fundingThumbnail})`}}
          >
            <div className="none">
              <div className="row">
                <div className="col-md-8 imgArea">
                  {Fund?.isGoodFunding==='Y'? (<div style={{color:'white', backgroundColor:'#f74a64', textAlign:'center', fontWeight: 'bold',  width:'150px', height:'50px', alignItems:'center', position:'absolute', top:"0px", zIndex:'auto', lineHeight:'50px'}}>Good Funding</div>):(<></>)}
                  <CardMedia
                    className="cardImg"
                    component="img"
                    alt="펀딩 카드 이미지"
                    height="100%"
                    onClick={handleClickOpen("body")}
                    image={Fund?.fundingThumbnail}
                    title="Card Image"
                  />

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                  >
                    <DialogContent
                      className="dialog"
                      dividers={scroll === "paper"}
                    >
                      <img
                        onClick={handleClose}
                        width="100%"
                        src={Fund?.fundingThumbnail}
                      ></img>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="col-md-4 fundingInfo">
                  <div className="barInfo d-flex flex-wrap justify-content-end align-items-end">
                    <Box my={1} display="flex" justifyContent="space-between">
                      <Box className="fundRate">
                        {Fund?.fundingAchievementRate}%
                      </Box>
                      <Box className="fundAmount">
                        {Fund?.fundingAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원 모금
                      </Box>
                    </Box>
                  </div>
                  <div>
                    <BorderLinearProgress
                      className="progressBar"
                      variant="determinate"
                      value={
                        Number(Fund?.fundingAchievementRate) > 100
                          ? 100
                          : Number(Fund?.fundingAchievementRate)
                      }
                    />
                  </div>

                  <div>
                    <div className="infoBox" style={{}}>
                    <Button
                        className="idolbtn nbg_bold col-md-12 col-sm-12 col-xs-12"
                        variant="contained"
                       
                        onClick={goToIdol}
                      >
                        <img style={{ height: "40px" }} src={kHeartIcon} /> 펀딩
                        아이돌: {Fund?.idolName}
                      </Button>
                      <Button
                        startIcon={<AssignmentInd />}
                        variant="outlined"
                        className="boxbtn nbg_bold col-md-4 col-sm-12 col-xs-4"
                        onClick={handleClickOpen2("body")}
                      >
                        {Fund?.userNickname}
                  
                      </Button>
                      <Button
                        startIcon={<GroupIcon/>}
                        variant="outlined"
                        className="boxbtn nbg_bold col-md-4 col-sm-12 col-xs-4"
                      > {Fund?.fundingParticipants}명 참여</Button>
                         <Button
                        startIcon={<ScheduleIcon/>}
                        variant="outlined"
                        className="boxbtn nbg_bold col-md-4 col-sm-12 col-xs-4"
                      > {Fund?.fundingRemainDay}일 남음</Button>

                
                      <Button
                        startIcon={<DoneIcon />}
                        variant="outlined"
                        className="boxbtn nbg_bold col-md-12 col-sm-12 col-xs-12"
                      >
                        목표 금액:{" "}
                        {Fund?.fundingGoalAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </Button>

                      <Button
                        startIcon={<TodayIcon />}
                        variant="outlined"
                        className="boxbtn nbg_bold col-md-12 col-sm-12 col-xs-12"
                      >
                        {startdate}~{enddate}
                      </Button>
                    </div>
                    {buttonRender()}
                  </div>
                </div>
              </div>
            </div>
          </div>
      

          <Dialog
                    open={open2}
                    onClose={handleClose2}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                  >
                    <DialogContent
                      className="dialog"
                      dividers={scroll === "paper"}
                    >
                          <CardContent className="cardDialog" style={{ height:'300px', paddingBottom: '0px' }} onClick={handleClose2}>
            <Grid container>
              <Grid container item xs={12}>
                <VerifiedUserIcon
                  style={{
                    color: 'black',
                    fontSize: '1.6em',
                    marginRight: '3px',
                    marginLeft: '10px',
                    opacity: 0.8,
                  }}
                />
                <Box
                  style={{ color: 'black', opacity: 0.8, marginBottom:'50px'}}
                  className="nbg_bold font-smooth"
                  fontSize="1.2em"
                >
                  {Fund?.userNickname}님의 인증 내역
                </Box>
              </Grid>
              <Grid item container xs={12} style={{ margin: '5px' }}>
                <Grid item xs={3}>
                  <Grid item container xs={12} justify="center">
                    <IconButton size="small" disabled={Fund?.isAdult !== 'N'}>
                      <PersonOutlineIcon
                        className={
                          Fund?.isAdult === 'Y'
                            ? styles.cert_icon
                            : Fund?.isAdult === 'Waiting'
                            ? styles.waiting_icon
                            : styles.uncert_icon
                        }
                      />
                    </IconButton>
                  </Grid>
                  <Grid item container xs={12} justify="center">
                    <Box
                      style={{
                        color: 'black',
                        opacity: 0.8,
                        fontSize: '1.2em',
                      }}
                      className="nbg_bold font-smooth"
                    >
                      성인 인증
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid item container xs={12} justify="center">
                    <IconButton
                      size="small"
                      disabled={
                        Fund?.isOfficialFan !== 'N' &&
                        Fund?.isOfficialFan !== 'Decline'
                      }
    
                    >
                      <FavoriteBorderIcon
                        className={
                          Fund?.isOfficialFan === 'Approve'
                            ? styles.cert_icon
                            : Fund?.isOfficialFan === 'Waiting'
                            ? styles.waiting_icon
                            : styles.uncert_icon
                        }
                      />
                    </IconButton>
                  </Grid>
                  <Grid item container xs={12} justify="center">
                    <Box
                      style={{
                        color: 'black',
                        opacity: 0.8,
                        fontSize: '1.2em',
                      }}
                      className="nbg_bold font-smooth"
                    >
                      팬활동 인증
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid item container xs={12} justify="center">
                    <IconButton
                      size="small"
                      disabled={
                        Fund?.isProfile !== 'N' && Fund?.isProfile !== 'Decline'
                      }
                    
                    >
                      <EmojiPeopleIcon
                        className={
                          Fund?.isProfile === 'Approve'
                            ? styles.cert_icon
                            : Fund?.isProfile === 'Waiting'
                            ? styles.waiting_icon
                            : styles.uncert_icon
                        }
                      />
                    </IconButton>
                  </Grid>
                  <Grid item container xs={12} justify="center">
                    <Box
                      style={{
                        color: 'black',
                        opacity: 0.8,
                        fontSize: '1.2em',
                      }}
                      className="nbg_bold font-smooth black"
                    >
                      총대 신상 인증
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid item container xs={12} justify="center">
                    <IconButton size="small" disabled={Fund?.isPlus !== 'N'}>
                      <AddCircleOutlineIcon
                        className={
                          Fund?.isPlus === 'Y'
                            ? styles.cert_icon
                            : Fund?.isPlus === 'Waiting'
                            ? styles.waiting_icon
                            : styles.uncert_icon
                        }
                      />
                    </IconButton>
                  </Grid>
                  <Grid
                    style={{
                      color: 'black',
                      opacity: 0.8,
                      fontSize: '1.2em',
                    }}
                    item
                    container
                    xs={12}
                    justify="center"
                  >
                    <Box className="nbg_bold black font-smooth">플러스 인증</Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <div>
            <img src={certBanner}></img>
          </div>
                    </DialogContent>
                  </Dialog>

          <div>
            <FullWidthTabs
              detail={Fund?.fundingContent}
              notices={notices}
            ></FullWidthTabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingDetail;
