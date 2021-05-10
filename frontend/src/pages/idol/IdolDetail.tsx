import React, { useEffect, useState } from 'react';
import Chart from '../../components/Chart';
import IdolFunding from '../../components/idol/idolDetail/IdolFunding';
import IdolInfo from '../../components/idol/idolDetail/IdolInfo';
import IdolMembers from '../../components/idol/idolDetail/IdolMembers';
import FundingMap from '../../components/idol/idolDetail/FundingMap';
import { Idol } from '../../common/types';
import { getIdolInfo } from '../../api/idol';
import { useParams } from 'react-router';

interface Params {
  idol_id: string;
}

const IdolDetail = () => {
  const [idolInfo, setIdolInfo] = useState<Idol>();
  const params: Params = useParams();

  useEffect(() => {
    console.log('idolDetailPage');
    getIdolInfo(Number(params.idol_id)).then((resp) => {
      setIdolInfo(resp.data);
    });
  }, [params]);

  return (
    <div>
      <IdolInfo idolInfo={idolInfo} />
      {idolInfo?.idolId == idolInfo?.idolGroupId ? (
        <IdolMembers idolInfo={idolInfo} />
      ) : (
        <></>
      )}
      <IdolFunding idolInfo={idolInfo} />
      <Chart />
      <FundingMap idolInfo={idolInfo} />
    </div>
  );
};

export default IdolDetail;
