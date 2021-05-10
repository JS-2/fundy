import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

declare global {
  interface Window {
    IMP: any;
  }
}
const { IMP } = window;

const FundPayment = () => {
  const [money, setMoney] = useState<number>(0);

  const handlerMoney = (e: any) => {
    setMoney(Number(e.target.value));
  };

  const history = useHistory();

  const payment_test = () => {
    IMP.init('imp09514011');

    IMP.request_pay(
      {
        pg: 'inicis', // version 1.1.0부터 지원.
        pay_method: 'card',
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '주문명:결제테스트',
        amount: money, //판매 가격
        buyer_email: 'iamport@siot.do',
        buyer_name: '구매자이름',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
      },
      function (rsp: any) {
        if (rsp.success) {
          var msg = '결제가 완료되었습니다.';
        } else {
          var msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
        }
        alert(msg);
        history.push('/mypage/1');
      }
    );
  };

  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
        펀딩 결제하기
      </Box>
      <img src="https://d1o7cxaf8di5ts.cloudfront.net/file/project/singer_hotissue_01/info/hotissue_01_thumb_v2.png" />
      <TextField
        value={money}
        onChange={handlerMoney}
        label="후원금"
        type="number"
      ></TextField>
      <Button className="btn_main" variant="contained" onClick={payment_test}>
        후원하기
      </Button>
    </div>
  );
};

export default FundPayment;
