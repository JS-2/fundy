import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  TextField,
} from '@material-ui/core';
import React from 'react';
import IdolCard from '../../IdolCard';

const IdolSearch = () => {
  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
        아이돌 리스트
      </Box>
      <Box
        mb={3}
        display="flex"
        alignContent="center"
        justifyContent="flex-end"
      >
        <TextField variant="outlined" size="small"></TextField>
        <Button className="ml-2" disableElevation variant="contained">
          {' '}
          검색{' '}
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item container xs={3} justify="center">
          <IdolCard />
        </Grid>
        <Grid item container xs={3} justify="center">
          <IdolCard />
        </Grid>
        <Grid item container xs={3} justify="center">
          <IdolCard />
        </Grid>
        <Grid item container xs={3} justify="center">
          <IdolCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default IdolSearch;
