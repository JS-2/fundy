import { Box, Button, CardMedia, Modal, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { getFundDetail } from '../../api/fund';
import { FundForm } from '../../common/types';
import Banner from '../../components/Banner';

declare global {
  interface Window {
    IMP: any;
  }
}
const { IMP } = window;
interface MatchParams {
  num: string;
}

const FundPayment = ({ match }: RouteComponentProps<MatchParams>) => {
  const params: Params = useParams();
  interface Params {
    fund_id: string;
  }
  const [Fund, setFund] = useState<FundForm>();
  console.log(match.params.num);
  useEffect(() => {
    console.log("fundDetailPage");

    getFundDetail(Number(match.params.num)).then((response) => {
      console.log(">>>>" + response.data);
      setFund(response.data);
    });

  }, [params]);
  
  const [money, setMoney] = useState<number>(10000);

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
          alert(msg);
          history.push('/mypage/1');
        } else {
          var msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
          var urlBack='/funding/detail/'+Fund?.fundingId;
          alert(msg);
          history.push(urlBack);
        }
       
      }
    );
  };

  return (
    <div>
      <Banner></Banner>
      <div>

      </div>
      <div className="col-md-1"></div>
      <div className="col-md-10">
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '2em' }}>
        펀딩 결제하기
      </Box>
      <div className="row">
      <div className="col-md-8 imgArea">
                  <CardMedia
                    className="cardImg"
                    component="img"
                    alt="펀딩 카드 이미지"
                    height="100%"
         
                    image={Fund?.fundingThumbnail}
                    title="Card Image"
                  />

                </div>

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
   
      </div>
     
    </div>
  );
};

export default FundPayment;
