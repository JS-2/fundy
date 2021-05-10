import React, { useEffect, useState } from 'react';
import Chart from '../../components/Chart';
import IdolFunding from '../../components/idol/idolDetail/IdolFunding';
import IdolInfo from '../../components/idol/idolDetail/IdolInfo';
import IdolMembers from '../../components/idol/idolDetail/IdolMembers';
import FundingMap from '../../components/idol/idolDetail/FundingMap';
import { Idol, IdolDetailInfo } from '../../common/types';
import { getIdolInfo } from '../../api/idol';
import { useParams } from 'react-router';

interface Params {
  idol_id: string;
}

const IdolDetail = () => {
  const [detailInfo, setDetailInfo] = useState<IdolDetailInfo>();
  const params: Params = useParams();

  useEffect(() => {
    console.log('idolDetailPage');
    getIdolInfo(Number(params.idol_id)).then((resp) => {
      setDetailInfo(resp.data);
    });
  }, [params]);

  return (
    <div>
      <IdolInfo idolInfo={detailInfo?.idolInfo} />
      {detailInfo?.idolInfo?.idolId == detailInfo?.idolInfo?.idolGroupId ? (
        <IdolMembers idolInfo={detailInfo?.idolInfo} />
      ) : (
        <></>
      )}
      <IdolFunding idolInfo={detailInfo?.idolInfo} />
      <Chart />
      <FundingMap idolInfo={detailInfo?.idolInfo} />
    </div>
  );
};

export default IdolDetail;
