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
import { Idol } from '../../../common/types';

interface Props {
  idolInfo: Idol | undefined;
}

const IdolInfo = (props: Props) => {
  console.log(props.idolInfo);
  return (
    <div>
      <Box display="flex" alignItems="center">
        <div className="nbg_bold mx-4" style={{ fontSize: '2em' }}>
          {props.idolInfo?.idolName}
        </div>
        <Button
          disableElevation
          disabled
          variant="contained"
          className="btn_main py-0"
        >
          {props.idolInfo?.idolId == props.idolInfo?.idolGroupId
            ? '그룹'
            : '멤버'}
        </Button>
      </Box>
      <Box display="flex" justifyContent="center">
        <Card>
          <img src={props.idolInfo?.idolPicture} style={{ height: 400 }} />
          {/* <img
            src="https://w.namu.la/s/4882104f184435e246e6ca88e9880a49969b947ba0bcafa3f9afce085dc99396bb3baa604b77f6278181652cef0f22a4a21693031fd5c7a8541291692f06132a3415f59db04e9ddd4305827a2cba26ce2dd3495fa3a48859bdd2ca15f0e0f0281a00773fcf4f9d72b26501b1039c1f7a"
            style={{ height: 400 }}
          /> */}
        </Card>
        {props.idolInfo?.idolAge !== null ? (
          <Card style={{ marginLeft: 10 }}>
            <Table>
              <TableRow>
                <TableCell>나이</TableCell>
                <TableCell>{props.idolInfo?.idolAge}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>생년월일</TableCell>
                <TableCell>{props.idolInfo?.idolBirthday}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>혈액형</TableCell>
                <TableCell>{props.idolInfo?.idolBlood}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>키</TableCell>
                <TableCell>{props.idolInfo?.idolHeight}cm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>몸무게</TableCell>
                <TableCell>{props.idolInfo?.idolWeight}kg</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>소속사</TableCell>
                <TableCell>{props.idolInfo?.idolAgency}</TableCell>
              </TableRow>
            </Table>
          </Card>
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
};

export default IdolInfo;
