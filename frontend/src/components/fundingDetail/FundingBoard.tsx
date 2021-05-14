import React, { Component, useEffect, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import "./FundingBoard.css";
import { Accordion, Grid } from "@material-ui/core";
import AccordionComp from "./AccordionComp";
import { render } from "react-dom";
import { RouteComponentProps } from "react-router-dom";
import { FundingNotice } from "../../common/types";
import { getFundNotice } from "../../api/fund";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

interface MatchParams {
  num: string;
}

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
