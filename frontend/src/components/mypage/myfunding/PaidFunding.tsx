import { Box, Button, Card, CardContent, Divider } from '@material-ui/core';
import React from 'react';

const PaidFunding = () => {
  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '1.2em' }}>
        나의 펀딩 상세
      </Box>
      <Card className="p-3">
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Box className="nbg_bold" style={{ fontSize: '2em' }}>
              싸피싸피 데뷔 1주년 기념 펀딩
            </Box>
            <Box>
              <Button
                disableElevation
                disabled
                variant="contained"
                className="btn_main"
              >
                진행중
              </Button>
            </Box>
          </Box>
          <Box className="nbg" style={{ fontSize: '0.9em', color: 'grey' }}>
            싸피싸피의 데뷔 1주년을 기념하여 후원 물품을 전달하는 펀딩입니다.
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box className="nbg_bold" mt={1} style={{ fontSize: '0.9em' }}>
              by. 싸피싸피팬01 (A+)
            </Box>
            <Box className="nbg_bold" mt={1} style={{ fontSize: '2em' }}>
              \30,000
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
            <Box>결제 번호</Box>
            <Box>결제번호부여</Box>
          </Box>
          <Box
            className="nbg"
            mt={5}
            display="flex"
            justifyContent="space-between"
          >
            <Box>펀딩 날짜</Box>
            <Box>2021.04.21 13:43:22</Box>
          </Box>
          <Box
            className="nbg"
            mt={5}
            display="flex"
            justifyContent="space-between"
          >
            <Box>펀딩 종료일</Box>
            <Box>2021.05.03</Box>
          </Box>
          <Box
            className="nbg"
            mt={5}
            display="flex"
            justifyContent="space-between"
          >
            <Box>펀딩 상태</Box>
            <Box>결제 완료</Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaidFunding;
