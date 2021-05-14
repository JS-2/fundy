import React, { Component, useEffect, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import "./FundingBoard.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Editor, Viewer } from "@toast-ui/react-editor";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
} from "react-html-parser";

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
    <div className="container">
      <div className="col-md-12">
        <div id="viewer">
          <div dangerouslySetInnerHTML={ {__html: props.detail} }>
      </div>

      </div>
    </div>
    </div>
  );
};

export default FundingInfo;
