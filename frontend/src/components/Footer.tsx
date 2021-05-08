import { Box } from "@material-ui/core";
import React from "react";
import user from "../reducers/user";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="foot col-md-12">
      <div className="row">
        <div className="col-md-10 textInfo">
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


    </div>
  );
};

export default Footer;
