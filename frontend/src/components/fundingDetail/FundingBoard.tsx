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

class FundingBoard extends Component {
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
        <table className="col-md-12">
          <thead>
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>등록일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>첫번째 게시글입니다.</td>
              <td>2020-10-25</td>
              <td>6</td>
            </tr>
            <tr>
              <td>2</td>
              <td>두번째 게시글입니다.</td>
              <td>2020-10-25</td>
              <td>5</td>
            </tr>
            <tr>
              <td>3</td>
              <td>세번째 게시글입니다.</td>
              <td>2020-10-25</td>
              <td>1</td>
            </tr>
            <tr>
              <td>4</td>
              <td>네번째 게시글입니다.</td>
              <td>2020-10-25</td>
              <td>2</td>
            </tr>
            <tr>
              <td>5</td>
              <td>다섯번째 게시글입니다.</td>
              <td>2020-10-25</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default FundingBoard;
