import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Table,
  TableCell,
  TableRow,
} from '@material-ui/core';
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
        <Card>
          <img
            src="https://w.namu.la/s/aaa33714f2813239d3b77acaf226a42dddee72ec152bccc55ea41348b58e428d9493bebcb50bc1e403dc5cc2a739418dfde58d1a0b89115b94b7183400d9485eaa50baba116c79dd03ebc915e1e9a684cfbbbfe5e50113042a8e46f163945e780385952b7d477f2cc65eba4e04f0c529"
            style={{ height: 400 }}
          />
          {/* <img
            src="https://w.namu.la/s/4882104f184435e246e6ca88e9880a49969b947ba0bcafa3f9afce085dc99396bb3baa604b77f6278181652cef0f22a4a21693031fd5c7a8541291692f06132a3415f59db04e9ddd4305827a2cba26ce2dd3495fa3a48859bdd2ca15f0e0f0281a00773fcf4f9d72b26501b1039c1f7a"
            style={{ height: 400 }}
          /> */}
        </Card>
        <Card style={{ marginLeft: 10 }}>
          <Table>
            <TableRow>
              <TableCell>데뷔일</TableCell>
              <TableCell>2013년 6월 13일</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>데뷔 음반</TableCell>
              <TableCell>2 COOL 4 SKOOL</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>리더</TableCell>
              <TableCell>RM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>장르</TableCell>
              <TableCell>
                랩/힙합, 댄스, 팝, 발라드, 일렉트로닉뮤직, R&B
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>소속사</TableCell>
              <TableCell>BIGHIT MUSIC</TableCell>
            </TableRow>
          </Table>
        </Card>
      </Box>
    </div>
  );
};

export default IdolInfo;
