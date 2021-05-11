import { Box } from "@material-ui/core";
import React from "react";
import user from "../reducers/user";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="foot col-md-12">
      <div className="row">

      </div>

      <div className="row">

        <div className="col-md-10 textInfo">
          <div className="footInfo">
          <a className="footernbg" href="/">
              메인 페이지
            </a>
            <br></br>
            <br></br>
            <a className="footernbg" href="/funding">
              펀딩
            </a>
            <br></br>
            <br></br>
            <a className="footernbg" href="/idol">
              아이돌
            </a>
            <br></br>
            <br></br>
            <a className="footernbg" href="/store">
              스토어
            </a>
          </div>
          <br></br>
          <hr></hr>
       
          <br></br>
          <a id="footA" className="logo" href="/">
            fundy
          </a>
          <div className="marginleft">
          <div className="teamInfoFoot">
            <span id="dev">Developed by PRODUCE 303 </span>

            <span className="white">공지사항</span>
            <span className="white">펀딩 약관</span>
            <span className="white">고객 센터: 1344-4747</span>
            <span className="white">이용 안내</span>
         
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
