import React, { Component, useEffect, useState } from 'react';
import './FundingBoard.css';
import AccordionComp from './AccordionComp';
import { Box } from '@material-ui/core';

const FundingBoard = (props: any) => {
  return (
    <div className="col-md-12">
      <h4>펀딩 공지사항</h4>

      {props.notices.length === 0 ? (
        <div
          className="noBoardArea"
          style={{
            height: '300px',
            backgroundColor: '#ececec',
            textAlign: 'center',
            borderRadius: '20px',
            alignItems: 'center',
          }}
        >
          <h4 style={{ color: '#aaaaaa', lineHeight: '300px' }}>
            아직 공지사항이 올라오지 않았습니다!
          </h4>
        </div>
      ) : (
        <></>
      )}

      {props.notices.map((notice: any, index: number) => {
        return (
          <div key={index}>
            <AccordionComp notice={notice} />
          </div>
        );
      })}
    </div>
  );
};

export default FundingBoard;
