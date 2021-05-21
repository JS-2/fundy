import React, { Component, useState, useCallback, useEffect } from 'react';

class FundingQna extends Component {
  state = {
    boards: [
      {
        brdno: 1,
        brdwriter: 'Lee SunSin',
        brdtitle: 'If you intend to live then you die',
        brddate: new Date(),
      },
      {
        brdno: 2,
        brdwriter: 'So SiNo',
        brdtitle: 'Founder for two countries',
        brddate: new Date(),
      },
    ],
  };

  render() {
    const { boards } = this.state;
    const list = boards.map(function (row) {
      return +row.brdno + row.brdwriter;
    });

    return (
      <div>
        <h1>문의하기</h1>
        {list}
      </div>
    );
  }
}

export default FundingQna;
