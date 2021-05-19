import { Box, Button } from '@material-ui/core';
import React, { useState } from 'react';
import CertFanBoard from '../../components/admin/CertFanBoard';
import CertProfileBoard from '../../components/admin/CertProfileBoard';

const Admin = () => {
  const [certType, setCertType] = useState<number>(1);
  return (
    <div>
      <div className="row">
        <div className="col-md-1 col-sm-1"></div>
        <div className="col-md-10 col-sm-10">
          <Box
            mx={1}
            my={2}
            className="nbg_bold font-smooth"
            style={{ fontSize: '2em' }}
          >
            관리자 페이지
          </Box>
          <Button
            className={certType === 1 ? 'fundBtn' : 'unselect_fundBtn'}
            variant="contained"
            style={{ width: 140 }}
            onClick={() => {
              setCertType(1);
            }}
          >
            팬활동 인증 신청
          </Button>
          <Button
            className={certType === 2 ? 'fundBtn' : 'unselect_fundBtn'}
            style={{ width: 140 }}
            variant="contained"
            onClick={() => {
              setCertType(2);
            }}
          >
            프로필 인증 신청
          </Button>
          <Box mt={4} minHeight="400px">
            {certType === 2 ? <CertProfileBoard /> : <CertFanBoard />}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Admin;
