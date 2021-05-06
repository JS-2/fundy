import React, { Component } from "react";



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
      <div>
        {" "}
        <table>
          {" "}
          <tbody>
            {" "}
            <tr>
              {" "}
              <td width="50">No.</td> <td width="300">Title</td>{" "}
              <td width="100">Name</td> <td width="100">Date</td>{" "}
            </tr>{" "}
        
          </tbody>{" "}
        </table>{" "}
      </div>
    );
  }
}

export default FundingBoard;
