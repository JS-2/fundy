import { Box, Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFavoriteFundingList } from '../../../api/funding';
import {
  getFavoriteFunding,
  getPaidFunding,
  getRegistedFunding,
} from '../../../api/user';
import { IFunding, User } from '../../../common/types';
import { rootState } from '../../../reducers';
import FundCard from '../../FundCard';

const MyFunding = () => {
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  const [favFundings, setFavFundings] = useState<IFunding[]>();
  const [paidFundings, setPaidFundings] = useState<IFunding[]>();
  const [regFundings, setRegFundings] = useState<IFunding[]>();
  const [showFundings, setShowFundings] = useState<IFunding[]>();

  useEffect(() => {
    console.log(token);
    getFavoriteFunding(token).then((resp) => {
      setFavFundings(resp.data);
      setShowFundings(resp.data);
    });
    getPaidFunding(token).then((resp) => {
      setPaidFundings(resp.data);
    });
    getRegistedFunding(token).then((resp) => {
      setRegFundings(resp.data);
    });
  }, []);

  const handleChoiceBtn = (num: number) => {
    if (num == 1) {
      setShowFundings(favFundings);
    } else if (num == 2) {
      setShowFundings(paidFundings);
    } else if (num == 3) {
      setShowFundings(regFundings);
    }
  };
  return (
    <div>
      <Box
        mx={1}
        mt={5}
        mb={2}
        className="nbg_bold font-smooth"
        style={{ fontSize: '2em' }}
      >
        나의 펀딩
      </Box>
      <Box>
        <Button
          variant="contained"
          style={{ fontSize: '1em' }}
          onClick={() => {
            handleChoiceBtn(1);
          }}
        >
          관심 펀딩
        </Button>
        <Button
          style={{ marginLeft: '10px', fontSize: '1em' }}
          variant="contained"
          onClick={() => {
            handleChoiceBtn(2);
          }}
        >
          펀딩 내역
        </Button>
        <Button
          style={{ marginLeft: '10px', fontSize: '1em' }}
          variant="contained"
          onClick={() => {
            handleChoiceBtn(3);
          }}
        >
          등록 펀딩
        </Button>
      </Box>
      {showFundings?.length == 0 ? (
        <Box
          className="nbg_bold font-smooth"
          my={3}
          fontSize="3em"
          color="silver"
          height="300px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>펀딩 리스트가 없습니다.</Box>
        </Box>
      ) : (
        <></>
      )}
      <div className="row" style={{ marginTop: '20px' }}>
        <Grid container spacing={1}>
          {showFundings?.map((funding, i) => (
            <div className="col-md-4 col-sm-12" >
              <FundCard funding={funding} key={funding.fundingId}></FundCard>
            </div>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default MyFunding;
