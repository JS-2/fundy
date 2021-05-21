import React, { Component, useEffect, useRef, useState } from 'react';

import { Box, Dialog, DialogContent, DialogProps } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { rootState } from '../../reducers';
import { useSelector } from 'react-redux';
import { User } from '../../common/types';
import bannerTip from '../../assets/img/bannerTip.png';
import bannerCreate from '../../assets/img/bannerCreate.png';
import fundyTuto from '../../assets/img/fundyTuto.png';
import { getCerts } from '../../api/user';

const FundBanner = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  const loginRedirect = (msg: string, path: string) => {
    alert(msg);
    history.push({
      pathname: path,
      state: {},
    });
  };

  const createRedirect = () => {
    history.push({
      pathname: 'funding/create',
      state: {},
    });
  };
  const handleCreateBanner = () => {
    if (user === null) {
      loginRedirect('로그인 후 펀딩 제작이 가능합니다.', '/login');
    } else {
      getCerts(token).then((resp) => {
        console.log(resp.data.isAdult);
        if (resp.data.isAdult === 'Y') {
          createRedirect();
        } else {
          loginRedirect('성인 인증 후 제작이 가능합니다.', '/mypage');
        }
      });
    }
  };

  return (
    <div className="col-md-12" style={{ marginBottom: '3vw' }}>
      <div className="row ">
        <div
          className="col-md-6 col-xs-12 tutoBaneer hover14"
          onClick={handleClickOpen('body')}
          style={{ padding: '5px' }}
        >
          <figure id="figure1">
            <img
              src={bannerTip}
              style={{
                width: '100%',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
            />
          </figure>
        </div>
        <div
          className="col-md-6 col-xs-12 createBanner hover15"
          onClick={handleCreateBanner}
          style={{ padding: '5px' }}
        >
          <figure id="figure2">
            <img
              src={bannerCreate}
              style={{
                width: '100%',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
            />
          </figure>
        </div>
      </div>
      <Dialog
        className="dialogClass"
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent className="dialog" dividers={scroll === 'paper'}>
          <div className="modalDiv">
            <img onClick={handleClose} width="100%" src={fundyTuto}></img>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FundBanner;
