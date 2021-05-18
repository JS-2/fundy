import React, { Component, useEffect, useState } from 'react';
import './FundingBoard.css';
import AccordionComp from './AccordionComp';
import { Box } from '@material-ui/core';

const FundingBoard = (props: any) => {
  return (
    <div className="container">
      <h4>펀딩 공지사항</h4>

      {props.notices.length === 0 ? (
        <Box my={3} fontSize="3em" color="silver">
          공지사항이 없습니다.
        </Box>
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
