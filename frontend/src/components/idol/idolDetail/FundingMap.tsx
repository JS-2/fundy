import { Opacity } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Idol } from '../../../common/types';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  idolInfo: Idol | undefined;
}

const { kakao } = window;

const FundingMap = (props: Props) => {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(36, 128),
      level: 13,
      draggable: false,
      zoomable: false,
    };
    const map = new kakao.maps.Map(container, options);
    let iwPosition = new kakao.maps.LatLng(35.450701, 128.570667);
    var circle = new kakao.maps.Circle({
      center: iwPosition, // 원의 중심좌표 입니다
      radius: 50000, // 미터 단위의 원의 반지름입니다
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
        content: '<div>hello</div>',
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

    kakao.maps.event.addListener(circle, 'click', function () {});
  }, []);
  return (
    <div
      id="myMap"
      style={{
        width: '600px',
        height: '700px',
      }}
    ></div>
  );
};

export default FundingMap;
