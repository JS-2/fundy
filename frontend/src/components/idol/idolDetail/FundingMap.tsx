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
  handleGetPlaceId: (place_id: number) => void;
}

const { kakao } = window;

const FundingMap = (props: Props) => {
  const markerSet = (map: any, place: IDonationPlace, geocoder: any) => {
    geocoder.addressSearch(place.placeAddress, (result: any, status: any) => {
      if (status == kakao.maps.services.Status.OK) {
        let iwPosition = new kakao.maps.LatLng(result[0].y, result[0].x);

        var imageSrc;
        if (place.donationPlaceId === 1) {
          imageSrc = require('../../../assets/img/heart_marker.png').default;
        } else if (place.donationPlaceId === 2) {
          imageSrc = require('../../../assets/img/pretty_marker.png').default;
        } else if (place.donationPlaceId === 3) {
          imageSrc = require('../../../assets/img/good_marker.png').default;
        } else if (place.donationPlaceId === 4) {
          imageSrc = require('../../../assets/img/pu_marker.png').default;
        }
        var imageSize = new kakao.maps.Size(50, 60); // 마커이미지의 크기입니다
        var imageOption = { offset: new kakao.maps.Point(26.5, 67) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          ),
          markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다
        var marker = new kakao.maps.Marker({
          position: iwPosition,
          image: markerImage,
        });

        marker.setMap(map);
        var logo: any;
        if (place.donationPlaceId === 1) {
          logo = require('../../../assets/img/heart_logo.jpg').default;
        } else if (place.donationPlaceId === 2) {
          logo = require('../../../assets/img/pretty_logo.png').default;
        } else if (place.donationPlaceId === 3) {
          logo = require('../../../assets/img/good_logo.jpg').default;
        } else if (place.donationPlaceId === 4) {
          logo = require('../../../assets/img/pu_logo.jpg').default;
        }
        var iwContent = `
          <span style="display: block; padding:10px; width:180px;">
            <div style="display: flex; align-items: center;">
              <img src="${logo}" style="width: 50px; height: 50px; margin-left: 10px; margin-right: 5px;"/>
              <div>
                <div style="font-weight: bold;">
                  ${place.placeName}
                </div>
                <div>
                  ${place.idolDonationPlaceAmount}원
                </div>
              </div>
            </div>
          </span>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          // 마커 위에 인포윈도우를 표시합니다
          props.handleGetPlaceId(place.donationPlaceId);
          infowindow.open(map, marker);
        });
        kakao.maps.event.addListener(marker, 'mouseout', function () {
          props.handleGetPlaceId(0);
          infowindow.close();
        });
      }
    });
  };
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.5, 127),
      level: 10,
    };
    const map = new kakao.maps.Map(container, options);
    let geocoder = new kakao.maps.services.Geocoder();
    props.data.forEach((place: IDonationPlace) => {
      markerSet(map, place, geocoder);
    });
  }, [props.data]);
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '600px',
        }}
      >
        <div
          id="myMap"
          style={{
            width: '100%',
            height: '100%',
          }}
        ></div>
      </div>
    </>
  );
};

export default FundingMap;
