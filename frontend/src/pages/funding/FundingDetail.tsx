import React, { useEffect, useState } from "react";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
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
import GroupIcon from '@material-ui/icons/Group';
import TodayIcon from '@material-ui/icons/Today';

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
  const [percentage, setPercentage]= useState<number>();
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
        console.log("이건");
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
  const [notices, setNotices] = useState<FundingNotice[]>([]);

  useEffect(() => {
    console.log("fundDetailPage");

    getFundDetail(Number(match.params.num)).then((response) => {
      console.log(response.data);
      setFund(response.data);
    });

    if(Fund?.fundingAchievementRate!=null){
      if(Number(Fund?.fundingAchievementRate)>=100){
        setPercentage(100);
      }else setPercentage(Number(Fund?.fundingAchievementRate));

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

  const goToIdol = ()=>{
    const idolUrl="/idol/"+Fund?.idolId;
    history.push({
      pathname: idolUrl,
      state: {},
    });
  }

  const startdate=Fund?.fundingStartTime?.replaceAll('-','.').split('T',1);
  const enddate=Fund?.fundingEndTime?.replaceAll('-','.').split('T',1);

  return (
    <div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <div
            className="fundingHeader"
            //style={{ background: `url(${Fund?.fundingThumbnail})`}}
          >
            <div className="none">
              <div
                className="titleArea" //style={{ background: `url(${Fund?.fundingThumbnail})`}}
              >
                <h3 className="fundingTitle">{Fund?.fundingName}</h3>
                <h5 className="fundingSub">{Fund?.fundingSubtitle}</h5>
              </div>

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
                    <span className="fundAmount">
                    ￦
                      {Fund?.fundingAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      
                    </span>
                    <span className="fundRate">
                      {Fund?.fundingAchievementRate}%
                    </span>
                  </div>
                  <div>
                  <BorderLinearProgress
                    className="progressBar"
                    variant="determinate"
                    value={percentage}
                  />

                  </div>

                 

                  <div>
                    <Button
                      startIcon={
                        fundingFavorite ? (
                          <FavoriteIcon color="secondary" />
                        ) : (
                          <FavoriteBorderIcon color="secondary" />
                        )
                      }
                      variant="outlined"
                      className="favbtn nbg_bold col-md-6 col-sm-6"
                      color={fundingFavorite ? "secondary" : "default"}
                      onClick={user === null ? loginRedirect : handleFavorite}
                    >
                      관심 {fundingFavorite ? "해제" : "등록"}
                    </Button>

                    <Button
                      startIcon={<CreditCardIcon />}
                      className="paybtn col-md-6 col-sm-6"
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={user === null ? loginRedirect : onClickPayment}
                    >
                      펀딩하기
                    </Button>

                    <div className="infoBox" style={{ }}>
                    <Button
                      startIcon={<AssignmentInd />}
                      variant="outlined"
                      className="boxbtn nbg_bold col-md-12 col-sm-12"
                    >
                      펀딩 개설자: {Fund?.userNickname}
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
                      startIcon={<TodayIcon/>}
                      variant="outlined"
                      className="boxbtn nbg_bold col-md-12 col-sm-12"
                    >
                      {startdate}~{enddate}
                    </Button>


                    </div>
                  
                    <Chip
                      label="Custom delete icon"
                      deleteIcon={<DoneIcon />}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      icon={<AssignmentInd />}
                      label={Fund?.userNickname}
                      color="primary"
                      variant="outlined"
                    />
                    <h5>
                      목표 금액:{" "}
                      {Fund?.fundingGoalAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </h5>
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
