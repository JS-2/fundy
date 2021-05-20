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
    <div style={{display:'inline-block'}}>
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
    <>
          {fundings?.map((funding, i) => (
            <div className="col-md-12 col-xs-12" style={{marginBottom:'20px'}}>

              <FundCard funding={funding}></FundCard>

            </div>
          ))}
 
      </>)}
  
      <div style={{color:'white'}}>d</div>
    </div>
  );
};

export default IdolFunding;
