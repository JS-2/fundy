import React, { useEffect, useState } from 'react';
import { getIdolRanking } from '../../api/idol';
import { IChartData } from '../../common/types';
import Banner from '../../components/Banner';
import Chart from '../../components/Chart';
import TopChart from '../../components/idol/idolDetail/TopChart';
import IdolSearch from '../../components/idol/idolList/IdolSearch';

interface IRankingData {
  idolId: number;
  idolName: string;
  donationAmount: string;
}

const IdolList = () => {
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 10);
    getIdolRanking().then((resp) => {
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
    <div
      style={{
        opacity: show ? 1 : 0,
        transition: 'all 0.5s ease-in-out',
      }}
    >
      <div>
        <Banner />
      </div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <TopChart />
          <IdolSearch />
        </div>
      </div>
    </div>
  );
};

export default IdolList;
