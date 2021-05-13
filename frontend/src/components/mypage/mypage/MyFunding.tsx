import { Box, Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFavoriteFundingList } from '../../../api/funding';
import { getFavoriteFunding } from '../../../api/user';
import { IFunding, User } from '../../../common/types';
import { rootState } from '../../../reducers';
import FundCard from '../../FundCard';

const MyFunding = () => {
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  const [fundings, setFundings] = useState<IFunding[]>();

  useEffect(() => {
    console.log(token);
    getFavoriteFunding(token).then((resp) => {
      setFundings(resp.data);
    });
  }, []);
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
        {fundings?.map((funding, i) => (
          <Grid item xs={4}>
            <FundCard funding={funding} key={funding.fundingId}></FundCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyFunding;
