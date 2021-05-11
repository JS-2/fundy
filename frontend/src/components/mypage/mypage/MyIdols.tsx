import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFavorite } from '../../../api/user';
import { Idol, User } from '../../../common/types';
import { rootState } from '../../../reducers';
import IdolCard from '../../IdolCard';

const MyIdols = () => {
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const [idols, setIdols] = useState<Idol[]>();
  useEffect(() => {
    getFavorite(user.user_id).then((resp) => {
      setIdols(resp.data);
    });
  }, []);
  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
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
    </div>
  );
};

export default MyIdols;
