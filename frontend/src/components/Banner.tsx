import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper/core';
import './Banner.css';

const Banner = () => {
  return (
      
    <Swiper
    spaceBetween={50}
    slidesPerView={1}
    pagination={{ clickable: true }}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
  >
    <SwiperSlide>    
      <div
        className="col-md-12"
        id="banner"
        style={{
          backgroundColor: "#cc8877",
          borderRadius: "10px",
          height: "300px",
        }}
      >
        <h1>배너영역1</h1>
      </div></SwiperSlide>
    <SwiperSlide>        <div
        className="col-md-12"
        id="banner"
        style={{
          backgroundColor: "#44848c",
          borderRadius: "20px",
          height: "300px",
        }}
      >
        <h1>배너영역2</h1>
      </div></SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide>
    <SwiperSlide>Slide 4</SwiperSlide>

  </Swiper>

  );
};

export default Banner;
