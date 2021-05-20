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
  const [favFundings, setFavFundings] = useState<IFunding[]>([]);
  const [paidFundings, setPaidFundings] = useState<IFunding[]>([]);
  const [regFundings, setRegFundings] = useState<IFunding[]>([]);
  const [showFundings, setShowFundings] = useState<IFunding[]>([]);
  const [selectedBtn, setSelectedBtn] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 400);
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
      setShowFundings([]);
      setTimeout(() => {
        setShowFundings(favFundings);
      }, 10);
      setSelectedBtn(1);
    } else if (num == 2) {
      setShowFundings([]);
      setTimeout(() => {
        setShowFundings(paidFundings);
      }, 10);
      setSelectedBtn(2);
    } else if (num == 3) {
      setShowFundings([]);
      setTimeout(() => {
        setShowFundings(regFundings);
      }, 10);
      setSelectedBtn(3);
    }
  };
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transition: 'all 0.5s ease-in-out',
      }}
    >
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
          className={selectedBtn == 1 ? 'fundBtn' : 'unselect_fundBtn'}
          variant="contained"
          style={{ fontSize: '1em' }}
          onClick={() => {
            handleChoiceBtn(1);
          }}
        >
          관심 펀딩
        </Button>
        <Button
          className={selectedBtn == 2 ? 'fundBtn' : 'unselect_fundBtn'}
          style={{ marginLeft: '10px', fontSize: '1em' }}
          variant="contained"
          onClick={() => {
            handleChoiceBtn(2);
          }}
        >
          펀딩 내역
        </Button>
        <Button
          className={selectedBtn == 3 ? 'fundBtn' : 'unselect_fundBtn'}
          style={{ marginLeft: '10px', fontSize: '1em' }}
          variant="contained"
          onClick={() => {
            handleChoiceBtn(3);
          }}
        >
          등록 펀딩
        </Button>
      </Box>
      <Box
        className="nbg_bold font-smooth"
        my={3}
        fontSize="3em"
        color="silver"
        height="300px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{
          transition: 'opacity 0.5s ease-in-out',
          opacity: showFundings?.length === 0 ? 1 : 0,
          visibility: showFundings?.length === 0 ? 'visible' : 'hidden',
          height: showFundings?.length === 0 ? '300px' : '0px',
        }}
      >
        <Box>펀딩 리스트가 없습니다.</Box>
      </Box>
      <div className="row" style={{ marginTop: '20px' }}>
        <Grid container spacing={1}>
          {showFundings?.map((funding, i) => (
            <div
              className="col-md-4 col-sm-12"
              style={{ marginBottom: '20px' }}
              key={i}
            >
              <FundCard funding={funding} key={funding.fundingId}></FundCard>
            </div>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default MyFunding;
