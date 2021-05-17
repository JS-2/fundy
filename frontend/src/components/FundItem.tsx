import React, { useEffect, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Grid, Paper, Box } from "@material-ui/core";
import "./FundCard.css";
import { useHistory, withRouter } from "react-router-dom";
import { IFunding } from "../common/types";

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 5,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#f74a64 !important",
    },
  })
)(LinearProgress);

interface Props {
  funding: IFunding | null;
  rank: number;
}

const FundItem = (props: Props) => {
  const [fundingInfo, setFundingInfo] = useState<IFunding>();
  const history = useHistory();
  const [dday, setDday] = useState<string>();
  const [percentage, setPercentage] = useState<number>();

  useEffect(() => {
    if (props.funding !== null) {
      if (props.funding.fundingRemainDay == 0) {
        setDday("마감 임박");
      } else if (props.funding.fundingRemainDay < 0) {
        setDday("펀딩 마감");
      } else {
        setDday(props.funding.fundingRemainDay+"일 남음");
      }
      setFundingInfo(props.funding);
      if (fundingInfo?.fundingAchievementRate != null) {
        if (fundingInfo?.fundingAchievementRate >= 100) {
          setPercentage(100);
        } else setPercentage(fundingInfo?.fundingAchievementRate);
      }
    }
  }, [props]);

  const redirect = (e: any, id: any) => {
    console.log("redirecting...");
    const url = "/funding/detail/" + id;
    history.push({
      pathname: url,
      state: { fundingId: id },
    });
  };

  return (
    
    <div className="fundItem"  onClick={(e) => redirect(e, fundingInfo?.fundingId)}>
         <div className="col-md-8" style={{ padding: "5px" }}  onClick={(e) => redirect(e, fundingInfo?.fundingId)}>
        <h4>{props?.rank+1}위</h4>
        <Typography
          gutterBottom
          style={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
            width: "inherit",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {fundingInfo?.fundingName}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
        {dday}
        </Typography>
        <Box my={1} display="flex" justifyContent="space-between">
          <Box>{fundingInfo?.fundingAmount}</Box>
          <Box>{fundingInfo?.fundingAchievementRate}%</Box>
        </Box>
    
      </div>
      <Card
        className="itemClass col-md-4"
       
        style={{
          padding: "0",
          height: "100%",
          display: "block",
          border: "solid 1px lightgrey",
        }}
        elevation={0}
      >
        <CardActionArea>
          <Card elevation={0}>
            <CardMedia
              className="cardImgA"
              component="img"
              alt="펀딩 카드 이미지"
              height="100%"
              image={fundingInfo?.fundingThumbnail}
              title="Card Image"
            />
          </Card>
        </CardActionArea>
      </Card>

     
    </div>
  );
};

export default FundItem;
