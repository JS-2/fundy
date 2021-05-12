import React, { useEffect, useState } from 'react';
import { getIdolRanking } from '../../api/idol';
import { IChartData } from '../../common/types';
import Banner from '../../components/Banner';
import Chart from '../../components/Chart';
import IdolSearch from '../../components/idol/idolList/IdolSearch';

interface IRankingData {
  idolId: number;
  idolName: string;
  donationAmount: string;
}

const IdolList = () => {
  const [chartData, setChartData] = useState<IChartData[]>([]);

  useEffect(() => {
    getIdolRanking().then((resp) => {
      console.log(resp.data);
      setChartData(
        resp.data.map((idol: IRankingData) => {
          const obj: IChartData = {
            name: idol.idolName,
            금액: Number(idol.donationAmount.replaceAll(',', '')),
          };
          return obj;
        })
      );
    });
  }, []);
  return (
    <div>
      <Banner />
      <Chart title="아이돌 차트" data={chartData} />
      <IdolSearch></IdolSearch>
    </div>
  );
};

export default IdolList;
