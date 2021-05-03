import { Box, Button, Card, CardMedia } from '@material-ui/core';
import React from 'react';

const IdolInfo = () => {
  return (
    <div>
      <Box display="flex" alignItems="center">
        <div className="nbg_bold mx-4" style={{ fontSize: '2em' }}>
          싸피스타
        </div>
        <Button
          disableElevation
          disabled
          variant="contained"
          className="btn_main ml-2 py-0"
        >
          그룹
        </Button>
        <Button
          disableElevation
          disabled
          variant="contained"
          className="btn_main ml-2 py-0"
        >
          남성
        </Button>
        <Button
          disableElevation
          disabled
          variant="contained"
          className="btn_main ml-2 py-0"
        >
          팝
        </Button>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box width="60%">
          <Card>
            <CardMedia
              height="400"
              component="img"
              alt="펀딩 카드 이미지"
              image="https://ww.namu.la/s/613496b5fd8bc36f498ff868cae96eae76331bd19536ce3fdf37551b0960fca29985eea37314a516dfc116a1d031f03eeb4a76895ca828aa84a8c83537e587abea343f825543816d95b2eeefb5328182449fc347cd3e26319ad4d4b46079bd354e0305ccc0b550cd3ad8dde61e33fa00"
              title="Card Image"
            />
          </Card>
        </Box>
      </Box>
    </div>
  );
};

export default IdolInfo;
