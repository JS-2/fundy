import React, { useEffect } from 'react';
import Banner from '../../components/Banner';
import Chart from '../../components/Chart';
import IdolSearch from '../../components/idol/idolList/IdolSearch';

const IdolList = () => {
  return (
    <div>
      <Banner />
      <Chart></Chart>
      <IdolSearch></IdolSearch>
    </div>
  );
};

export default IdolList;
