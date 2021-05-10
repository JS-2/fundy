import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import { Idol } from '../../../common/types';
import FundCard from '../../Fundcard';

interface Props {
  idolInfo: Idol | undefined;
}

const IdolFunding = (props: Props) => {
  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
        관련 펀딩
      </Box>
      <Swiper
        spaceBetween={5}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        navigation
      >
        <SwiperSlide>
          <FundCard></FundCard>
        </SwiperSlide>
        <SwiperSlide>
          <FundCard></FundCard>
        </SwiperSlide>
        <SwiperSlide>
          <FundCard></FundCard>
        </SwiperSlide>
        <SwiperSlide>
          <FundCard></FundCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default IdolFunding;
