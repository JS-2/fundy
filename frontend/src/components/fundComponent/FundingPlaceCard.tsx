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
      onClick={() => {
        setPlaceId(place.donationPlaceId);
      }}
      style={
        place.donationPlaceId === placeId
          ? {
              border: 'solid 2px #fc798d',
              cursor: 'pointer',
              height: '250px',
              transition: 'all 0.1s ease-out',
            }
          : {
              border: 'solid 1px #e0e0e0',
              cursor: 'pointer',
              height: '250px',
              transition: 'all 0.1s ease-out',
            }
      }
    >
      <CardHeader
        title={<div className="nbg_bold font-smooth">{place.placeName}</div>}
        subheader={
          <div className="nbg_bold font-smooth">{place.placeAddress}</div>
        }
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
            <Box className="nbg_m font-smooth" fontSize="1em">
              {place.placeDescription}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FundingPlaceCard;
