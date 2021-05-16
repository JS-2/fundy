import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
} from '@material-ui/core';
import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckIcon from '@material-ui/icons/Check';
import { IDonationPlace } from '../../common/types';

interface Props {
  place: IDonationPlace;
  placeId: number;
  setPlaceId: any;
}

const FundingPlaceCard = (props: Props) => {
  const { place, placeId, setPlaceId } = props;
  return (
    <Card
      elevation={0}
      onClick={() => {
        setPlaceId(place.donationPlaceId);
      }}
      style={
        place.donationPlaceId === placeId
          ? { border: 'solid 3px #f74a64', cursor: 'pointer' }
          : { border: 'solid 3px silver', cursor: 'pointer' }
      }
    >
      <CardHeader
        title={place.placeName}
        subheader={place.placeAddress}
        action={
          <CheckIcon
            style={
              place.donationPlaceId === placeId
                ? { fontSize: '3em', color: '#f74a64' }
                : { fontSize: '3em', color: 'lightgrey' }
            }
          />
        }
      ></CardHeader>
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <Card elevation={0} style={{ border: 'solid 1px lightgrey' }}>
              <CardMedia
                component="img"
                alt="펀딩 카드 이미지"
                image={place.placePicture}
                title="Card Image"
              />
            </Card>
          </Grid>
          <Grid item xs={9} container alignContent="center">
            <Box>{place.placeDescription}</Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FundingPlaceCard;
