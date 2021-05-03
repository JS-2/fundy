import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import SwiperCore, { Navigation, Pagination, Autoplay,SwiperOptions  } from 'swiper';

import './Banner.css';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import banner1 from '../assets/img/Banner.png';


const swiperParams: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
  };
  


const Banner = () => {
  return (
    <Swiper
    spaceBetween={0}
    slidesPerView={1}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
    navigation
    pagination={{ clickable: true }}
    loop={true}
    autoplay={true}
  >
    <SwiperSlide>    
      <div
        className="col-md-12"
        id="banner"
        style={{
          borderRadius: "10px",
          height: "300px",
        }}
      >

        
        <img src={banner1} style={{
          width: "100%",
        }}></img>
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
