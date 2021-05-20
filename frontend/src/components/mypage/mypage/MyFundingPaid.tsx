import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFundPayList } from '../../../api/fund';
import { getFundingList } from '../../../api/funding';
import { User, FundForm, IFunding, FundingPay } from '../../../common/types';
import FundItem from '../../FundItem';
import PaidFunding from '../myfunding/PaidFunding';
import { rootState } from '../../../reducers';
import { Box, Grid } from '@material-ui/core';

const MyFundingPaid = () => {
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  const [fundingPays, setFundingPays] = useState<FundingPay[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 800);
    getFundPayList(token).then((resp) => {
      setFundingPays(resp.data);
    });
  }, []);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transition: 'all 0.5s ease-in-out',
      }}
    >
      <Box
        mt={5}
        mb={2}
        className="nbg_bold font-smooth"
        style={{ fontSize: '2em' }}
      >
        결제목록
      </Box>
      <div style={{ padding: '0px' }}>
        {fundingPays?.map((fundPay: any, i: number) => {
          <div className="fundpayDiv" key={fundPay.fundingId}>
            <PaidFunding fundPay={fundPay}></PaidFunding>
          </div>;
        })}
      </div>
      <Grid container spacing={3}>
        {fundingPays?.map((fundPay: any, i: number) => (
          <div
            className="col-md-6"
            style={{ padding: '10px' }}
            key={fundPay.fundingId}
          >
            <PaidFunding fundPay={fundPay}></PaidFunding>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default MyFundingPaid;
