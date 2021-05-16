import React, { Component, useEffect, useState } from "react";
import "./FundingBoard.css";
import AccordionComp from "./AccordionComp";



const FundingBoard = (props: any) => {

  return (
    <div className="container">
      <h4>펀딩 공지사항</h4>
  
     
        {props.notices.map((notice: any, index: number) => {
          if (notice==null){
            console.log("!!!!");
            return(<div><h1>펀딩 공지사항이 없습니다</h1></div>);
          }else{
          return (
            <div>
              <AccordionComp notice={notice} key={index} />
            </div>
          );
          }
        })}
     
      </div>
  );
};

export default FundingBoard;
