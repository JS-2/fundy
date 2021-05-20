import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Grid,
  Hidden,
  Modal,
} from '@material-ui/core';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  SwiperOptions,
} from 'swiper';

import "./Banner.css";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import banner1 from "../assets/img/bannerf.png";
import banner2 from "../assets/img/BannerY.png";
import banner3 from "../assets/img/bannerN.png";
import banner4 from "../assets/img/bannerB.png";
import bannerBr from "../assets/img/bannerBr.png";

import banner23 from "../assets/img/banner6.jpg";
import banner6 from "../assets/img/bannerE.png";
import { CenterFocusStrong } from "@material-ui/icons";
import fundyTuto from "../assets/img/fundyTuto.png";
import { useHistory } from 'react-router-dom';

SwiperCore.use([Autoplay, Pagination, Navigation]);
const swiperParams: SwiperOptions = {
  slidesPerView: 3,
  spaceBetween: 50,
};

const Banner = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();

  const bannerRedirect = (page:string) =>()=> {
    history.push({
      pathname: 'funding/detail/'+page
    });
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div className="col-md-12 bannerArea" style={{overflowX:'hidden', padding:'0px'}}>
      <Swiper
        className="col-md-12 col-sm-12 bannerBody"
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{ clickable: true }}
        loop
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        style={{height:'auto'}}
      >
        <SwiperSlide>
          <div
            className="col-md-12 banner"
            id="banner"
            style={{
              borderRadius: '5px',
              padding: 0,
            }}
            onClick={handleClickOpen('body')}
          >
            <img
              src={banner1}
              className="bannerImg"
              style={{
                alignContent: 'center',
                width: '100%',
              }}
            ></img>
          </div>
        </SwiperSlide>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogContent className="dialog" dividers={scroll === 'paper'}>
            <div className="modalDiv">
              <img onClick={handleClose} width="100%" src={fundyTuto}></img>
            </div>
          </DialogContent>
        </Dialog>

        <SwiperSlide>
          <div
            className="banner"
            id="banner"
            style={{
              borderRadius: '5px',
              height:'auto',
              padding: 0,
            }}
            onClick={bannerRedirect('16')}
          >
            <img
              className="bannerImg"
              src={banner2}
       
              style={{
                alignContent: 'center',
                width: '100%',
              }}
            ></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner"
            id="banner"
            style={{
              // backgroundColor: '#44848c',
              borderRadius: '5px',
              padding: 0,
              height: 'auto',
            }}
            onClick={bannerRedirect('13')}
          >
            <img
              className="bannerImg"
              src={banner4}
              style={{
                alignContent: 'center',
                width: '100%',
              }}
            ></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner"
            id="banner"
            style={{
              // backgroundColor: '#44848c',
              borderRadius: '5px',
              padding: 0,
              height: 'auto',
              overflow: 'hidden',
            }}
            onClick={bannerRedirect('23')}
          >
            <img
              className="bannerImg"
              src={banner3}
              style={{
                alignContent: 'center',
                width: '100%',
              }}
            ></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner"
            id="banner"
            style={{
              //backgroundColor: '#44848c',
              borderRadius: '5px',
              height: 'auto',
              padding: 0,
              overflow: 'hidden',
            }}
          >
            <img
              className="bannerImg"
              src={banner1}
              style={{
                alignContent: 'center',
                width: '100%',
              }}
            ></img>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="banner"
            id="banner"
            style={{
              //backgroundColor: '#44848c',
              borderRadius: '5px',
              height: 'auto',
              padding: 0,
              overflow: 'hidden',
            }}
          >
            <img
              className="bannerImg"
              src={bannerBr}
              onClick={bannerRedirect('22')}
              style={{
                alignContent: 'center',
                width: '100%',
              }}
            ></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="banner"
            id="banner"
            style={{
              //backgroundColor: '#44848c',
              borderRadius: '5px',
              height: 'auto',
              padding: 0,
              overflow: 'hidden',
            }}
            onClick={bannerRedirect('15')}
          >
            <img
              className="bannerImg"
              src={banner6}
              style={{
                alignContent: 'center',
                width: '100%',
              }}
            ></img>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
