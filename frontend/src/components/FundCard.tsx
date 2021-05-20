import React, { useEffect, useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid, Paper, Box } from '@material-ui/core';
import './FundCard.css';
import { useHistory, withRouter } from 'react-router-dom';
import { IFunding } from '../common/types';
const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#f74a64 !important',
    },
  })
)(LinearProgress);

interface Props {
  funding: IFunding | null;
}

const FundCard = (props: Props) => {
  const [fundingInfo, setFundingInfo] = useState<IFunding>();
  const history = useHistory();
  const [dday, setDday] = useState<string>();
  const [percentage, setPercentage] = useState<number>();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (props.funding !== null) {
      if (
        new Date(props.funding.fundingEndTime).getTime() -
          new Date().getTime() <
        0
      ) {
        setDday('펀딩 마감');
      } else if (props.funding.fundingRemainDay == 0) {
        setDday('마감 임박');
      } else if (props.funding.fundingRemainDay < 0) {
        setDday('펀딩 마감');
      } else {
        setDday('D-' + props.funding.fundingRemainDay);
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
    const url = '/funding/detail/' + id;
    history.push({
      pathname: url,
      state: { fundingId: id },
    });
  };

  return (
    <Card
      className="cardClass"
      onClick={(e) => redirect(e, fundingInfo?.fundingId)}
      style={{
        padding: '0',
        height: show ? '450px' : '0px',
        display: 'block',
        border: 'solid 1px lightgrey',
        borderRadius: '10px',
        paddingBottom: '',
        transition: 'opacity 1s ease-in-out, height 0.5s ease-in-out',
        opacity: show ? 1 : 0,
      }}
      elevation={0}
    >
      <CardActionArea>
        <Card elevation={0}>
          <CardMedia
            className="cardImgA"
            component="img"
            alt="펀딩 카드 이미지"
            height="250"
            width="inherit"
            image={fundingInfo?.fundingThumbnail}
            title="Card Image"
          />
        </Card>
        <CardContent style={{ padding: '10px' }}>
        <Box my={1} display="flex" justifyContent="space-between">
            <Box className="fundingAmountTxt">
            <Chip className="ddayBadge" label={dday} />
            </Box>
            <Box className="fundingRateTxt">
            <h5>{fundingInfo?.fundingParticipants}명 참여 중</h5>
            </Box>
          </Box>
       
          <Typography
            gutterBottom
            variant="h5"
            component="h5"
            style={{
              fontWeight: 'bold',
              fontSize: '2rem',
              whiteSpace: 'nowrap',
              width: 'inherit',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {fundingInfo?.fundingName}
          </Typography>

          <Typography
            variant="h5"
            color="textSecondary"
            component="h4"
            style={{
              whiteSpace: 'nowrap',
              width: 'inherit',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {fundingInfo?.fundingSubtitle}
          </Typography>
          <Box my={1} display="flex" justifyContent="space-between">
            <Box className="fundingAmountTxt">
              {fundingInfo?.fundingAmount}원
            </Box>
            <Box className="fundingRateTxt">
              {fundingInfo?.fundingAchievementRate}%
            </Box>
          </Box>
          <BorderLinearProgress
            variant="determinate"
            value={
              Number(fundingInfo?.fundingAchievementRate) > 100
                ? 100
                : Number(fundingInfo?.fundingAchievementRate)
            }
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FundCard;
