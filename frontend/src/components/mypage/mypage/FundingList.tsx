import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import FundCard from '../../FundCard';

const MyFunding = () => {
  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
        나의 펀딩
      </Box>
      <Button variant="contained">후원 펀딩</Button>
      <Button className="ml-2" variant="contained">
        등록 펀딩
      </Button>
      <Grid className="mt-2" container spacing={2}>
        <Grid item xs={4}>
          <FundCard></FundCard>
        </Grid>
        <Grid item xs={4}>
          <FundCard></FundCard>
        </Grid>
        <Grid item xs={4}>
          <FundCard></FundCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyFunding;
