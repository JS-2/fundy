import React from 'react';
import Chart from '../../components/Chart';
import IdolFunding from '../../components/idol/idolDetail/IdolFunding';
import IdolInfo from '../../components/idol/idolDetail/IdolInfo';
import IdolMembers from '../../components/idol/idolDetail/IdolMembers';
import FundingMap from '../../components/idol/idolDetail/FundingMap';

const IdolDetail = () => {
  return (
    <div>
      <IdolInfo />
      <IdolMembers />
      <IdolFunding />
      <Chart />
      <FundingMap />
    </div>
  );
};

export default IdolDetail;
