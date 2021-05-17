import { Box, Button, Grid, Hidden, Modal } from "@material-ui/core";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  SwiperOptions,
} from "swiper";

import "./Banner.css";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import banner1 from "../assets/img/Banner.png";
import banner2 from "../assets/img/cBanner.jpg";
import banner3 from "../assets/img/nBanner.jpg";
import banner4 from "../assets/img/banner4.png";
import banner5 from "../assets/img/banner5.png";
import banner6 from "../assets/img/banner6.jpg";
import { CenterFocusStrong } from "@material-ui/icons";
import fundyTuto from "../assets/img/fundyTuto.png";

SwiperCore.use([Autoplay, Pagination, Navigation]);
const swiperParams: SwiperOptions = {
  slidesPerView: 3,
  spaceBetween: 50,
};

const Banner = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="row">
      <Swiper
        className="col-md-12"
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div
            className="col-md-12"
            id="banner"
            style={{
              borderRadius: "5px",
              height: "400px",
              padding: 0,
              overflow: "hidden",
            }}
            onClick={handleOpen}
          >
            <img
              src={banner1}
              className="bannerImg"
              style={{
                width: "100%",
              }}
            ></img>
          </div>
        </SwiperSlide>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modalDiv">
            <img onClick={handleClose} width="80%" src={fundyTuto}></img>
          </div>
        </Modal>
        <SwiperSlide>
          <div
            className="col-md-12"
            id="banner"
            style={{
              //backgroundColor: '#44848c',
              borderRadius: "5px",
              height: "400px",
              padding: 0,
              overflow: "hidden",
            }}
          >
            <img
              className="bannerImg"
              src={banner2}
              style={{
                width: "100%",
                alignContent: "center",
              }}
            ></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="col-md-12"
            id="banner"
            style={{
              // backgroundColor: '#44848c',
              borderRadius: "5px",
              padding: 0,
              height: "400px",
              overflow: "hidden",
            }}
          >
            <img
              className="bannerImg"
              src={banner4}
              style={{
                width: "100%",
                alignContent: "center",
              }}
            ></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="col-md-12"
            id="banner"
            style={{
              // backgroundColor: '#44848c',
              borderRadius: "5px",
              padding: 0,
              height: "400px",
              overflow: "hidden",
            }}
          >
            <img
              className="bannerImg"
              src={banner3}
              style={{
                width: "100%",
                alignContent: "center",
              }}
            ></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="col-md-12"
            id="banner"
            style={{
              //backgroundColor: '#44848c',
              borderRadius: "5px",
              height: "400px",
              padding: 0,
              overflow: "hidden",
            }}
          >
            <img
              className="bannerImg"
              src={banner5}
              style={{
                width: "100%",
                alignItems: "center",
              }}
            ></img>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="col-md-12"
            id="banner"
            style={{
              //backgroundColor: '#44848c',
              borderRadius: "5px",
              height: "400px",
              padding: 0,
              overflow: "hidden",
            }}
          >
            <img
              className="bannerImg"
              src={banner2}
              style={{
                width: "100%",
                alignItems: "center",
              }}
            ></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="col-md-12"
            id="banner"
            style={{
              //backgroundColor: '#44848c',
              borderRadius: "5px",
              height: "400px",
              padding: 0,
              overflow: "hidden",
            }}
          >
            <img
              className="bannerImg"
              src={banner6}
              style={{
                width: "100%",
                alignItems: "center",
              }}
            ></img>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
