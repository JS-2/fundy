import { Box, Card } from '@material-ui/core';
import { Opacity } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Idol, IDonationPlace } from '../../../common/types';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  idolInfo: Idol | undefined;
  data: IDonationPlace[];
}

const { kakao } = window;

const FundingMap = (props: Props) => {
  const circleSet = (map: any, place: IDonationPlace, geocoder: any) => {
    geocoder.addressSearch(place.placeAddress, (result: any, status: any) => {
      if (status == kakao.maps.services.Status.OK) {
        let iwPosition = new kakao.maps.LatLng(result[0].y, result[0].x);
        var circle = new kakao.maps.Circle({
          center: iwPosition, // 원의 중심좌표 입니다
          radius: 10000, // 미터 단위의 원의 반지름입니다
          strokeWeight: 1, // 선의 두께입니다
          strokeColor: '#f74a64', // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다

          fillColor: '#f74a64', // 채우기 색깔입니다
          fillOpacity: 0.5, // 채우기 불투명도 입니다
        });

        circle.setMap(map);
        var infowindow: any;

        kakao.maps.event.addListener(circle, 'mouseover', function () {
          infowindow = new kakao.maps.InfoWindow({
            map: map, // 인포윈도우가 표시될 지도
            position: iwPosition,
            content: `
            <div style='width: 200px; height:50px'>
              ${place.placeName}<br/>
              ${place.idolDonationPlaceAmount}원
            </div>`,
          });
          for (let i = 0; i < 30; i++) {
            setTimeout(() => {
              circle.setOptions({ fillOpacity: 0.5 + 0.01 * i });
            }, i * 5);
          }
        });

        kakao.maps.event.addListener(circle, 'mouseout', function () {
          for (let i = 0; i < 30; i++) {
            setTimeout(() => {
              circle.setOptions({ fillOpacity: 0.8 - 0.01 * i });
            }, i * 5);
          }
          infowindow.close();
        });

        kakao.maps.event.addListener(
          circle,
          'mousemove',
          function (mouseEvent: any) {
            let position = new kakao.maps.LatLng(
              mouseEvent.latLng.Ma + 0.05,
              mouseEvent.latLng.La
            );
            infowindow.setPosition(position);
          }
        );
      }
    });
  };
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(36.3, 127.7),
      level: 12,
    };
    const map = new kakao.maps.Map(container, options);
    let geocoder = new kakao.maps.services.Geocoder();
    props.data.forEach((place: IDonationPlace) => {
      circleSet(map, place, geocoder);
    });
  }, [props]);
  return (
    <>
      <Box
        mt={10}
        mb={3}
        className="nbg_bold font-smooth"
        style={{ fontSize: '2em' }}
      >
        {props.idolInfo?.idolName}의 기부지도
      </Box>
      <Card
        style={{
          width: '100%',
          height: '900px',
        }}
      >
        <div
          id="myMap"
          style={{
            width: '100%',
            height: '100%',
          }}
        ></div>
      </Card>
    </>
  );
};

export default FundingMap;
