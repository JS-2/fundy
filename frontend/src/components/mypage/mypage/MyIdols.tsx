import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFavorite } from '../../../api/user';
import { Idol, User } from '../../../common/types';
import { rootState } from '../../../reducers';
import IdolCard from '../../IdolCard';

const MyIdols = () => {
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  const [idols, setIdols] = useState<Idol[]>();
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    getFavorite(token).then((resp) => {
      setIdols(resp.data);
    });
    setTimeout(() => {
      setShow(true);
    }, 600);
  }, []);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transition: 'all 0.5s ease-in-out',
      }}
    >
      <Box my={3} className="nbg_bold font-smooth" style={{ fontSize: '2em' }}>
        나의 아이돌
      </Box>
      <Grid container spacing={2}>
        {idols?.map((idol, index) => {
          return (
            <Grid item container xs={3} justify="center">
              <IdolCard idol={idol} key={index} />
            </Grid>
          );
        })}
      </Grid>
      {idols?.length == 0 ? (
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
          <Box>아이돌 리스트가 없습니다.</Box>
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyIdols;
