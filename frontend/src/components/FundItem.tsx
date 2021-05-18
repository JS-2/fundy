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
import "./FundItem.css";
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
    
    <div className="fundItem" style={{height:"130px", marginBottom:"5px"}} onClick={(e) => redirect(e, fundingInfo?.fundingId)}>
        <div className="col-md-1 col-sm-1 rankArea">  <span className="ranking" style={{fontWeight:"bold"}}>{props?.rank+1}.</span></div>
        <div className="col-md-4 col-sm-3" style={{height:"130px",margin:"0px", padding:"0px", overflow:"hidden"}}> 
<Card
  className="itemClass"
  style={{
 
    marginLeft:"0px",
    
    height: "130px",
    borderRadius:"0px",
  }}
  elevation={0}
>

      <CardMedia
        className="cardImgA"
        component="img"
        alt="펀딩 카드 이미지"
        height="100%"
        image={fundingInfo?.fundingThumbnail}
        title="Card Image"
      />

</Card>
</div>
         <div className="col-md-7 col-sm-8 itemText" style={{ padding: "10px", height:"130px" }}  onClick={(e) => redirect(e, fundingInfo?.fundingId)}>
      
        <h5
            className="fundNameTxt"
          style={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {fundingInfo?.fundingName}
        </h5>

        <Typography variant="body2" color="textSecondary" component="p">
        {dday}
        </Typography>
        <Box my={1} display="flex" justifyContent="space-between " alignItems="flex-end">
          <div>{fundingInfo?.fundingAmount}</div>
          <div>{fundingInfo?.fundingAchievementRate}%</div>
        </Box>
    
      </div>
 
      

     
    </div>
  );
};

export default FundItem;
