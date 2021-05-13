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

  useEffect(() => {
    if (props.funding !== null) {
      setFundingInfo(props.funding);
    }
  }, [props]);

  const redirect = (e: any, id: any) => {
    console.log('redirecting...');
    const url = '/funding/detail/' + id;
    history.push({
      pathname: url,
      state: { fundingId: id },
    });
  };

  return (  
    <Card
      onClick={(e) => redirect(e, fundingInfo?.fundingId)}
      style={{ padding: '0', height: '100%', display: 'block' }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt="펀딩 카드 이미지"
          height="200"
          image={fundingInfo?.fundingThumbnail}
          title="Card Image"
        />
        <CardContent style={{ padding: '5px' }}>
          <Chip color="primary" label={'D-' + fundingInfo?.fundingRemainDay} />
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            style={{
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              width: 'inherit',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {fundingInfo?.fundingName}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {fundingInfo?.fundingSubtitle}
          </Typography>
          <Box my={1} display="flex" justifyContent="space-between">
            <Box>{fundingInfo?.fundingAmount}원</Box>
            <Box>{fundingInfo?.fundingAchievementRate}%</Box>
          </Box>
          <BorderLinearProgress
            variant="determinate"
            value={Number(fundingInfo?.fundingAchievementRate)}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FundCard;
