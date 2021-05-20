import React, { Component, useEffect, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import "./FundingBoard.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Editor, Viewer } from "@toast-ui/react-editor";
import bannerinfo from '../../assets/img/bannerInfo.png'
import Qna from "./Qna";
import { CardMedia } from "@material-ui/core";


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

const FundingInfo = (props: any) => {
  const [detail, setDetail] = useState("");

  useEffect(() => {
    console.log("props!!!!>>>" + props.detail);
    setDetail(props.detail);
    
  });


  return (
    <div className="new">
      <div style={{borderRadius:'20px', overflow:'hidden', marginBottom:'50px'}}>
   
      <CardMedia
                    className="cardImg"
                    component="img"
                    alt="펀딩 카드 이미지"
                    width="100%"
    
                    image={bannerinfo}
                    title="Card Image"
                  />
      </div>
       
      <div className="col-md-12">
        <div id="viewer" style={{wordBreak:"break-all"}}>
          <div className="col-md-12 col-sm-12" style={{wordBreak:"break-all"}} dangerouslySetInnerHTML={ {__html: props.detail} }>
      </div>

      </div>
    </div>
    <div><h3>문의/응원하기</h3>
    <Qna></Qna>
    </div>
    </div>
  );
};

export default FundingInfo;
