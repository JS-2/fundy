import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import SwiperCore, { Navigation, Pagination, Autoplay,SwiperOptions  } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';


const swiperParams: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
  };
  


const Qna = () => {
  return (
      <div>문의하기</div>
   

  );
};

export default Qna;