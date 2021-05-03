import React from 'react';
import Chart from '../../components/Chart';
import IdolFunding from '../../components/idol/idolDetail/IdolFunding';
import IdolInfo from '../../components/idol/idolDetail/IdolInfo';
import IdolMembers from '../../components/idol/idolDetail/IdolMembers';

const IdolDetail = () => {
  return (
    <div>
      <IdolInfo />
      <IdolMembers />
      <IdolFunding />
      <Chart />
    </div>
  );
};

export default IdolDetail;
