import React, { Component, useEffect, useState } from 'react';
import './FundingBoard.css';
import AccordionComp from './AccordionComp';
import { Box } from '@material-ui/core';

const FundingBoard = (props: any) => {
  return (
    <div className="col-md-12">
      <h4>펀딩 공지사항</h4>

      {props.notices.length === 0 ? (
        <div className="noBoardArea" style={{height:'300px', backgroundColor:'#cccccc', textAlign:'center',borderRadius:'20px', alignItems:'center'}}>
        <h3 style={{color:"white", lineHeight:'300px'}}>
          공지사항이 없습니다.
        </h3>
        </div>
      ) : (
        <></>
      )}

      {props.notices.map((notice: any, index: number) => {
        return (
          <div>
            <AccordionComp notice={notice} key={index} />
          </div>
        );
      })}
    </div>
  );
};

export default FundingBoard;
