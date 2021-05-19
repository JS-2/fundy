import { Box, Button, Card, CardContent, Divider } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { FundingPay } from '../../../common/types';

interface Props {
  fundPay: FundingPay | null;
}

const PaidFunding = (props: Props) => {
  const history = useHistory();

  return (
    <div>
      <Card className="p-3">
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Box
              className="nbg_bold font-smooth"
              style={{
                fontSize: '2em',
                width: '400px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={() => {
                history.push('/funding/detail/' + props.fundPay?.fundingId);
              }}
            >
              {props.fundPay?.fundingName}
            </Box>
            <Box>
              <Button
                disableElevation
                disabled
                variant="contained"
                className={
                  props.fundPay?.fundingStatement !== '종료'
                    ? 'btn_main font-smooth'
                    : 'font-smooth'
                }
              >
                {props.fundPay?.fundingStatement}
              </Button>
            </Box>
          </Box>
          <Box
            className="nbg_m font-smooth"
            mt={1}
            style={{
              fontSize: '0.9em',
              color: 'grey',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {props.fundPay?.fundingSubtitle}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box
              className="nbg_bold font-smooth"
              mt={1}
              style={{ fontSize: '0.9em' }}
            >
              by. {props.fundPay?.userNickname}
            </Box>
            <Box
              className="nbg_bold font-smooth"
              mt={1}
              style={{ fontSize: '2em' }}
            >
              {props.fundPay?.payAmount}
            </Box>
          </Box>
          <Box display="flex"></Box>
        </CardContent>

        <Divider></Divider>
        <CardContent style={{ fontSize: '0.9em' }}>
          <Box
            className="nbg_m font-smooth"
            mt={3}
            display="flex"
            justifyContent="space-between"
          >
            <Box>결제 번호</Box>
            <Box>{props.fundPay?.paymentId}</Box>
          </Box>
          <Box
            className="nbg_m font-smooth"
            mt={5}
            display="flex"
            justifyContent="space-between"
          >
            <Box>펀딩 날짜</Box>
            <Box>{props.fundPay?.payDatetime}</Box>
          </Box>
          <Box
            className="nbg_m font-smooth"
            mt={5}
            display="flex"
            justifyContent="space-between"
          >
            <Box>펀딩 종료일</Box>
            <Box>{props.fundPay?.fundingEndTime}</Box>
          </Box>
          <Box
            className="nbg_m font-smooth"
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
