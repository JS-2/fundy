import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFundPayList } from '../../../api/fund';
import { getFundingList } from '../../../api/funding';
import { User, FundForm, IFunding, FundingPay } from '../../../common/types';
import FundItem from '../../FundItem';
import PaidFunding from '../myfunding/PaidFunding';
import { rootState } from '../../../reducers';
import { Grid } from '@material-ui/core';

const MyFundingPaid = () => {
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  const [fundingPays, setFundingPays] = useState<FundingPay[]>([]);

  
  useEffect(() => {
    console.log("받아오기 시작")
    getFundPayList(token).then((resp) => {
      console.log(">>>>펀딩 결제 목록>>>"+resp.data);
      setFundingPays(resp.data);
    });
  }, []);


  return (
    <div> 
      <h2>결제목록</h2>
            <div style={{ padding: "0px" }}>
                {fundingPays?.map((fundPay:any, i: number) => {
                    <div
                      className="fundpayDiv"
                      key={fundPay.fundingId}
                    >
                      <PaidFunding fundPay={fundPay}></PaidFunding>
                    </div>
             
                })}
              </div>
              <Grid container spacing={3}>
            {fundingPays?.map((fundPay: any, i: number) => (
              <div className="col-md-6"  style={{ padding: '10px' }} key={fundPay.fundingId}>
                <PaidFunding fundPay={fundPay}></PaidFunding>
              </div>
            ))}
          </Grid>
      
    </div>
  );
};

export default MyFundingPaid;
