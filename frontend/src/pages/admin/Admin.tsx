import { Box, Button } from '@material-ui/core';
import React, { useState } from 'react';
import CertFanBoard from '../../components/admin/CertFanBoard';
import CertProfileBoard from '../../components/admin/CertProfileBoard';

const Admin = () => {
  const [certType, setCertType] = useState<number>(1);
  return (
    <div>
      <Box mx={1} my={2} className="nbg_bold" style={{ fontSize: '2em' }}>
        관리자 페이지
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          setCertType(1);
        }}
      >
        팬활동 인증 신청
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setCertType(2);
        }}
      >
        프로필 인증 신청
      </Button>
      {certType === 2 ? <CertProfileBoard /> : <CertFanBoard />}
    </div>
  );
};

export default Admin;
