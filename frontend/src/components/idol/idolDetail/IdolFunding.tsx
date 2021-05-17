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
        mx={1}
        mt={10}
        mb={5}
        className="nbg_bold"
        style={{ fontSize: '2em' }}
      >
        연관 펀딩
      </Box>
      <Swiper
        spaceBetween={5}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        navigation
      >
        {fundings?.map((funding, i) => (
          <SwiperSlide>
            <FundCard funding={funding} key={i}></FundCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default IdolFunding;
