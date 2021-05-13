import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Table,
  TableCell,
  TableRow,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Idol, User } from '../../../common/types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useSelector } from 'react-redux';
import { rootState } from '../../../reducers';
import { getFavorite, setFavorite } from '../../../api/user';
import { useParams } from 'react-router';

interface Props {
  idolInfo: Idol | undefined;
}

interface Params {
  idol_id: string;
}

const IdolInfo = (props: Props) => {
  const [idolFavorite, setIdolFavorite] = useState<boolean>(false);
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const params: Params = useParams();
  console.log('props', props);

  useEffect(() => {
    if (user === null) return;
    getFavorite(user.user_id).then((resp) => {
      console.log('resp data', resp.data);
      const check = resp.data.find((e: Idol) => {
        if (e.idolId == Number(params.idol_id)) {
          return true;
        }
      });
      if (check) setIdolFavorite(true);
      else setIdolFavorite(false);
    });
  }, [user]);

  const handleFavorite = () => {
    setFavorite(user.user_id, Number(params.idol_id), idolFavorite).then(
      (resp) => {
        setIdolFavorite(!idolFavorite);
      }
    );
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
        <Box display="flex" alignItems="center" justifyContent="space-between">
        <div className="nbg_bold" style={{ fontSize: '2em' }}>
          {props.idolInfo?.idolName}
        </div>
        {user === null ? (
          <></>
        ) : (
          <Button
            variant="contained"
            className="nbg_bold"
            color={idolFavorite ? 'secondary' : 'default'}
            onClick={handleFavorite}
          >
            관심 {idolFavorite ? '해제' : '등록'}
          </Button>
        )}
      </Box>
      <Box display="flex" justifyContent="center">
        <Card>
          <img src={props.idolInfo?.idolPicture} style={{ width: '100%' }} />
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
      </div>
      
    </div>
  );
};

export default IdolInfo;
