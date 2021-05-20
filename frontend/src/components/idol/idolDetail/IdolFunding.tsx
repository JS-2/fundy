import { Box, Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import { IFunding, Idol } from '../../../common/types';
import FundCard from '../../FundCard';

interface Props {
  funding: IFunding[] | undefined;
}

const IdolFunding = (props: Props) => {
  const [fundings, setFundings] = useState<IFunding[]>();
  useEffect(() => {
    setFundings(props.funding);
  }, [props]);
  return (
    <div>
      <Box
        mt={10}
        mb={3}
        className="nbg_bold font-smooth"
        style={{ fontSize: '2em' }}
      >
        연관 펀딩
      </Box>
      {fundings?.length == 0 ? (
        <Box
          className="nbg_bold font-smooth"
          minHeight="400px"
          fontSize="3em"
          color="silver"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box>연관 펀딩이 없습니다.</Box>
        </Box>
      ) : (
        <Swiper
          spaceBetween={5}
          slidesPerView={3.3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          style={{
            boxShadow: 'none',
            marginLeft: 0,
            marginRight: 0,
            height: '440px',
          }}
        >
          {fundings?.map((funding, i) => (
            <SwiperSlide key={i}>
              <FundCard funding={funding}></FundCard>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default IdolFunding;
