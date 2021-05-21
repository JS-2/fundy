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
import { Box, Card, Grid } from '@material-ui/core';

interface Params {
  idol_id: string;
}

const IdolDetail = () => {
  const [detailInfo, setDetailInfo] = useState<IdolDetailInfo>();
  const [donationData, setDonationData] = useState<IChartData[]>([]);
  const [donationPlaceData, setDonationPlaceData] = useState<IDonationPlace[]>(
    []
  );
  const [show, setShow] = useState<boolean>(false);

  const params: Params = useParams();
  const [mouseOverPlace, setMouseOverPlace] = useState<number>(0);

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 10);
  }, [params]);

  useEffect(() => {
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

  const handleGetPlaceId = (place_id: number) => {
    setMouseOverPlace(place_id);
  };

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transition: show ? 'all 0.5s ease-in-out' : '',
      }}
    >
      <div className="row">
        <IdolInfo idolInfo={detailInfo?.idolInfo.idol} />
        <div className="col-md-1"></div>
        <div className="col-md-10">
          {detailInfo?.idolInfo.members !== undefined &&
          detailInfo?.idolInfo.members.length !== 0 ? (
            <IdolMembers idolInfo={detailInfo?.idolInfo} />
          ) : (
            <></>
          )}
          <IdolFunding funding={detailInfo?.idolFundingProject} />
          <Box
            mt={10}
            mb={3}
            className="nbg_bold font-smooth"
            style={{ fontSize: '2em' }}
          >
            {detailInfo?.idolInfo.idol.idolName} 가 남긴 기부 발자취
          </Box>
          <Card elevation={0}>
            {donationData.length === 0 ? (
              <Grid container>
                <Grid item xs={12} sm={6} md={6}>
                  <FundingMap
                    idolInfo={detailInfo?.idolInfo.idol}
                    data={donationPlaceData}
                    handleGetPlaceId={handleGetPlaceId}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: 600, width: '100%' }}
                  >
                    <Box
                      fontSize="3em"
                      color="silver"
                      className="nbg_bold font-smooth"
                    >
                      기부 이력이 없습니다.
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <FundingMap
                    idolInfo={detailInfo?.idolInfo.idol}
                    data={donationPlaceData}
                    handleGetPlaceId={handleGetPlaceId}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Chart
                    title={
                      detailInfo?.idolInfo.idol.idolName + '가 남긴 기부 발자취'
                    }
                    data={donationData}
                    mouseOverPlace={mouseOverPlace}
                  />
                </Grid>
              </Grid>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IdolDetail;
