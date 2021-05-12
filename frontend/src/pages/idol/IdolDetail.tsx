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
      <IdolInfo idolInfo={detailInfo?.idolInfo.idol} />
      {detailInfo?.idolInfo.members !== undefined &&
      detailInfo?.idolInfo.members.length !== 0 ? (
        <IdolMembers idolInfo={detailInfo?.idolInfo} />
      ) : (
        <></>
      )}
      <IdolFunding funding={detailInfo?.idolFundingProject} />
      <Chart
        title={detailInfo?.idolInfo.idol.idolName + '가 남긴 기부 발자취'}
      />
      <FundingMap idolInfo={detailInfo?.idolInfo.idol} />
    </div>
  );
};

export default IdolDetail;
