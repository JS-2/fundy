import React, { useEffect, useState } from 'react';
import Chart from '../../components/Chart';
import IdolFunding from '../../components/idol/idolDetail/IdolFunding';
import IdolInfo from '../../components/idol/idolDetail/IdolInfo';
import IdolMembers from '../../components/idol/idolDetail/IdolMembers';
import FundingMap from '../../components/idol/idolDetail/FundingMap';
import {
  IChartData,
  Idol,
  IdolDetailInfo,
  IDonationPlace,
} from '../../common/types';
import { getIdolDonationData, getIdolInfo } from '../../api/idol';
import { useParams } from 'react-router';

interface Params {
  idol_id: string;
}

const IdolDetail = () => {
  const [detailInfo, setDetailInfo] = useState<IdolDetailInfo>();
  const [donationData, setDonationData] = useState<IChartData[]>([]);
  const [donationPlaceData, setDonationPlaceData] = useState<IDonationPlace[]>(
    []
  );
  const params: Params = useParams();

  useEffect(() => {
    console.log('idolDetailPage');
    getIdolInfo(Number(params.idol_id)).then((resp) => {
      setDetailInfo(resp.data);
    });
    getIdolDonationData(params.idol_id).then((resp) => {
      setDonationPlaceData(resp.data);
      setDonationData(
        resp.data.map((donation: IDonationPlace) => {
          const data = {
            name: donation.placeName,
            금액: Number(donation.idolDonationPlaceAmount.replaceAll(',', '')),
          };
          return data;
        })
      );
    });
  }, [params]);

  return (
    <div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <IdolInfo idolInfo={detailInfo?.idolInfo.idol} />
          {detailInfo?.idolInfo.members !== undefined &&
          detailInfo?.idolInfo.members.length !== 0 ? (
            <IdolMembers idolInfo={detailInfo?.idolInfo} />
          ) : (
            <></>
          )}
          <IdolFunding funding={detailInfo?.idolFundingProject} />
          {donationData.length === 0 ? (
            <></>
          ) : (
            <Chart
              title={detailInfo?.idolInfo.idol.idolName + '가 남긴 기부 발자취'}
              data={donationData}
            />
          )}

          <FundingMap
            idolInfo={detailInfo?.idolInfo.idol}
            data={donationPlaceData}
          />
        </div>
      </div>
    </div>
  );
};

export default IdolDetail;
