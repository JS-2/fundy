import React, { useEffect, useState } from "react";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  Modal,
  SvgIcon,
} from "@material-ui/core";
import "./FundingDetail.css";
import { getFundDetail, getFundNotice } from "../../api/fund";
import FullWidthTabs from "../../components/fundComponent/FullWidthTabs";
import { FundForm, FundingNotice, IFunding, User } from "../../common/types";
import { RouteComponentProps, useHistory, useParams } from "react-router-dom";
import { Height, PinDropSharp } from "@material-ui/icons";
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
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        className="paybtn col-md-12 col-sm-12"
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
          className="favbtn nbg_bold col-md-6 col-sm-6 overlayLeftBtn"
          color={color1}
          onClick={func1}
        >
          {text1}
        </Button>

        <Button
          startIcon={icon2}
          className="paybtn col-md-6 col-sm-6 circleScaleBtn"
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
          className="paybtn col-md-12 col-sm-12"
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
                  <CardMedia
                    className="cardImg"
                    component="img"
                    alt="펀딩 카드 이미지"
                    height="100%"
                    onClick={handleOpen}
                    image={Fund?.fundingThumbnail}
                    title="Card Image"
                  />

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <div className="modalDiv">
                      <img
                        onClick={handleClose}
                        width="60%"
                        src={Fund?.fundingThumbnail}
                      ></img>
                    </div>
                  </Modal>
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
                        startIcon={<AssignmentInd />}
                        variant="outlined"
                        className="boxbtn nbg_bold col-md-12 col-sm-12"
                      >
                        펀딩 개설자: {Fund?.userNickname}
                        {Fund?.fundingParticipants}명 참여 중
                      </Button>

                      <Button
                        className="boxbtn nbg_bold col-md-12 col-sm-12"
                        variant="outlined"
                        onClick={goToIdol}
                      >
                        <img style={{ height: "28px" }} src={kHeartIcon} /> 펀딩
                        아이돌: {Fund?.idolName}
                      </Button>
                      <Button
                        startIcon={<DoneIcon />}
                        variant="outlined"
                        className="boxbtn nbg_bold col-md-12 col-sm-12"
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
                        className="boxbtn nbg_bold col-md-12 col-sm-12"
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
