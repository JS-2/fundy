import React, { Component } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import "./FundingBoard.css";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

class FundingInfo extends Component {
  state = {
    boards: [
      {
        brdno: 1,
        brdwriter: "Lee SunSin",
        brdtitle: "If you intend to live then you die",
        brddate: new Date(),
      },
      {
        brdno: 2,
        brdwriter: "So SiNo",
        brdtitle: "Founder for two countries",
        brddate: new Date(),
      },
    ],
  };

  render() {
    const { boards } = this.state;
    const list = boards.map(function (row) {
      return row.brdno + row.brdwriter;
    });
    return (
      <div className="container">
        <p style={{ textAlign: "center" }}>
          동키즈 멤버와 당첨자가 정해진 시간동안 영상 통화를 진행합니다.
        </p>
        <p style={{ textAlign: "center" }}>&nbsp;</p>
        <p style={{ textAlign: "center" }}>&nbsp;</p>
        <p style={{ textAlign: "left" }}>
          <span style={{ backgroundColor: "#ff6600", color: "#ffffff" }}>
            <strong>&nbsp;&lt;이벤트 진행일시&gt;&nbsp;</strong>
          </span>
        </p>
        <h6 id="mcetoc_1euhoj48k0" style={{ textAlign: "left" }}>
          👉 2021.05.09(일) 18:00
        </h6>
        <p className="html-content-mce_p_small" style={{ textAlign: "left" }}>
          <span style={{ color: "#808080" }}>
            *이벤트 일정은 아티스트 일정에 따라 변경될 수 있습니다.
          </span>
        </p>
        <p style={{ textAlign: "left" }}>&nbsp;&nbsp;</p>
        <p style={{ textAlign: "left" }}>
          <span style={{ backgroundColor: "#ff6600", color: "#ffffff" }}>
            <strong>&nbsp;&lt;이벤트 응모기간&gt;&nbsp;</strong>
          </span>
        </p>
        <p style={{ textAlign: "left" }}>
          <strong>👉 2021.04.27(화) ~ 2021.05.03(월)</strong>
        </p>
        <p style={{ textAlign: "left" }}>&nbsp;</p>
        <p style={{ textAlign: "left" }}>
          <span style={{ backgroundColor: "#ff6600", color: "#ffffff" }}>
            <strong>&nbsp;&lt;응모방법&gt;&nbsp;</strong>
          </span>
        </p>
        <p style={{ textAlign: "left" }}>
          👉 응모 기간 내 본 프로젝트 페이지에서{" "}
          <strong>DONGKIZ&nbsp;[Youniverse]를&nbsp;구매한 분 중</strong> 추첨을
          통해
          <span style={{ color: "#0000ff" }}>
            <strong> 30명을 선정 </strong>
          </span>
        </p>
        <p className="html-content-mce_p_small" style={{ textAlign: "left" }}>
          <span style={{ backgroundColor: "#ffff99", color: "#808080" }}>
            * 응모 가능 횟수는 주문건수와는 무관하며 본 프로젝트 안에서 앨범을
            구매하신 총 수량만큼 응모하실 수 있습니다.
          </span>
          <br />
          <span style={{ color: "#808080" }}>
            * 결제 완료 처리가 된 주문건에 한해서 EVENT에 응모하실 수 있습니다.
          </span>
          <br />
          <span style={{ color: "#0000ff" }}>
            <strong>
              *{" "}
              <span style={{ color: "#000000" }}>
                본 이벤트는 주문 시 기입해주시는{" "}
                <span style={{ backgroundColor: "#ffff99" }}>
                  이벤트 응모 정보(응모자 성함/응모자 전화번호/ 응모자
                  메신저&amp;ID)
                </span>
                를 토대로 응모가 진행됩니다.
              </span>
            </strong>
          </span>
          <br />* 앨범 기명은 구매하실 때 입력하신 스타메이커명
          기준이며&nbsp;한/영(한글 10자 이내, 영어 20자 이내)에 한하여
          가능합니다. 스타메이커명이 적합하지 않은 것으로 판단되는 경우 변경
          요청드릴 수 있습니다.
        </p>
        <p>&nbsp;</p>
        <p>
          <span style={{ backgroundColor: "#ff6600", color: "#ffffff" }}>
            <strong>&nbsp;&lt;당첨자 발표&gt;&nbsp;</strong>
          </span>
        </p>
        <p>
          <strong>
            👉 2021.05.04(화), 12:00 이후 메이크스타 프로젝트 페이지 및 당첨자
            개별 안내
          </strong>
        </p>
        <p>&nbsp;</p>
        <p>
          <span style={{ backgroundColor: "#ff6600", color: "#ffffff" }}>
            <strong>&nbsp;&lt;추첨 인원&gt;&nbsp;</strong>
          </span>
        </p>
        <p>
          <strong>👉30명</strong>
        </p>
        <p>&nbsp;</p>
        <hr />
      </div>
    );
  }
}

export default FundingInfo;
