import { Box, Button, Grid, TextField } from '@material-ui/core';
import React from 'react';
import IdolCard from '../../IdolCard';

const IdolMembers = () => {
  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
        싸피스타 멤버
      </Box>
      <Grid container spacing={2}>
        {/* <Grid item container xs={3} justify="center">
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
        </Grid> */}
      </Grid>
    </div>
  );
};

export default IdolMembers;
