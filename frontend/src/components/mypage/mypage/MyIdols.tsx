import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFavorite } from '../../../api/user';
import { Idol, User } from '../../../common/types';
import { rootState } from '../../../reducers';
import IdolCard from '../../IdolCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper/core';

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
        <Swiper
          spaceBetween={10}
          slidesPerView={3.3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          style={{ height: '350px' }}
        >
          {idols?.map((idol) => (
            <SwiperSlide key={idol.idolId}>
              <IdolCard idol={idol} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MyIdols;
