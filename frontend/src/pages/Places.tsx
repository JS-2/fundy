import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getAllDonationPlaces } from '../api/funding';
import banner from '../assets/img/placesBanner.png';

const placeItem = (place: any) => {
  return (
    <>
      <Grid item container xs={12} style={{ marginTop: '30px' }}>
        <Grid
          item
          xs={4}
          style={{
            paddingRight: '30px',
            paddingLeft: '30px',
          }}
        >
          <Box
            style={{
              height: 0,
              width: '100%',
              paddingTop: '100%',
              position: 'relative',
            }}
          >
            <Avatar
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                border: 'solid 2px lightgrey',
              }}
              src={place.placePicture}
            ></Avatar>
          </Box>
        </Grid>
        <Grid item xs={8} style={{ paddingRight: '30px' }}>
          <Box className="nbg_bold font-smooth" mt={1} mb={2} fontSize="1.5em">
            {place.placeName}
          </Box>
          <Box className="nbg_m font-smooth" fontSize="1em">
            {place.placeDescription}
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider style={{ marginTop: 30 }} />
      </Grid>
    </>
  );
};

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 10);
  }, []);
  useEffect(() => {
    getAllDonationPlaces().then((resp: any) => {
      setPlaces(resp.data);
    });
  }, []);
  return (
    <div
      style={{
        minHeight: '900px',
        opacity: show ? 1 : 0,
        transition: 'all 0.5s ease-in-out',
      }}
    >
      <div className="row">
        <img src={banner} style={{ width: '100%' }}></img>
      </div>

      <Box display="flex" justifyContent="center">
        <div className="col-md-5">
          <Box mt={3} borderBottom={2}></Box>
          <Grid container>{places.map((place) => placeItem(place))}</Grid>
        </div>
      </Box>
    </div>
  );
};

export default Places;
