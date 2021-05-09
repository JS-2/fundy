import { Box } from "@material-ui/core";
import React from "react";
import user from "../reducers/user";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="foot col-md-12">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-6 textInfo">
          <a id="footAnchor" className="logo" href="/">
            fundy
          </a>
          <div className="teamInfo">
            <p>Developed by PRODUCE 303</p>
            <p>김윤성</p>
            <p>김재성</p>
            <p>이나영</p>
            <p>이원찬</p>
            <p>윤혜민</p>
          </div>
        </div>
        <div className="col-md-1">
          <h5>ddd</h5>
        </div>
      </div>
      <hr></hr>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 textInfo">
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
          <br></br>
          <br></br>
          <a id="footA" className="logo" href="/">
            fundy
          </a>
          <div className="marginleft">
          <div className="teamInfoFoot">
            <span>Developed by PRODUCE 303       </span>
            <span>김윤성</span>
            <span>김재성</span>
            <span>이나영</span>
            <span>이원찬</span>
            <span>윤혜민</span>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
