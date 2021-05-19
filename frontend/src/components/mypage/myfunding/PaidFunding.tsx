import { Box, Button, Card, CardContent, Divider } from '@material-ui/core';
import React from 'react';
import { FundingPay } from '../../../common/types';


interface Props {
  fundPay: FundingPay | null;
}



const PaidFunding = (props: Props) => {

  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
        나의 펀딩 상세
      </Box>
      <Card className="p-3">
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Box className="nbg_bold" style={{ fontSize: '2em' }}>
              {props.fundPay?.fundingName}
            </Box>
            <Box>
              <Button
                disableElevation
                disabled
                variant="contained"
                className="btn_main"
              >
                {props.fundPay?.fundingStatement}
              </Button>
            </Box>
          </Box>
          <Box className="nbg" style={{ fontSize: '0.9em', color: 'grey' }}>
          {props.fundPay?.fundingSubtitle}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box className="nbg_bold" mt={1} style={{ fontSize: '0.9em' }}>
              by. {props.fundPay?.userNickname}
            </Box>
            <Box className="nbg_bold" mt={1} style={{ fontSize: '2em' }}>
            {props.fundPay?.payAmount}
            </Box>
          </Box>
          <Box display="flex"></Box>
        </CardContent>

        <Divider></Divider>
        <CardContent style={{ fontSize: '0.9em' }}>
          <Box
            className="nbg"
            mt={3}
            display="flex"
            justifyContent="space-between"
          >
            <Box>결제 번호 {props.fundPay?.paymentId}</Box>
            <Box>결제번호부여 {props.fundPay?.paymentId}</Box>
          </Box>
          <Box
            className="nbg"
            mt={5}
            display="flex"
            justifyContent="space-between"
          >
            <Box>펀딩 날짜</Box>
            <Box>{props.fundPay?.payDatetime}</Box>
          </Box>
          <Box
            className="nbg"
            mt={5}
            display="flex"
            justifyContent="space-between"
          >
            <Box>펀딩 종료일</Box>
            <Box>{props.fundPay?.fundingEndTime}</Box>
          </Box>
          <Box
            className="nbg"
            mt={5}
            display="flex"
            justifyContent="space-between"
          >
            <Box>펀딩 상태</Box>
            <Box>{props.fundPay?.fundingStatement}</Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaidFunding;
