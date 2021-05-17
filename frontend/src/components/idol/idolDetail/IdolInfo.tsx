import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Modal,
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
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  const params: Params = useParams();
  console.log('props', props);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user === null) return;
    getFavorite(token).then((resp) => {
      console.log('resp data', resp.data);
      const check = resp.data.find((e: Idol) => {
        if (e.idolId == Number(params.idol_id)) {
          return true;
        }
      });
      if (check) setIdolFavorite(true);
      else setIdolFavorite(false);
    });
  }, [token]);

  const handleFavorite = () => {
    setFavorite(token, Number(params.idol_id), idolFavorite).then((resp) => {
      setIdolFavorite(!idolFavorite);
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
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
            <Card
              style={{ width: '100%', height: '600px', position: 'relative' }}
            >
              <CardMedia
                className="cardImg"
                component="img"
                width="100%"
                height="600px"
                image={props.idolInfo?.idolPicture}
                style={{ filter: 'blur(10px) brightness(50%)' }}
                title="Card Image"
              />
              <CardContent
                style={{
                  alignContent: 'center',
                  position: 'absolute',
                  top: '0px',
                  left: '0px',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Card style={{ width: '60%' }}>
                  <CardMedia
                    component="img"
                    image={props.idolInfo?.idolPicture}
                    style={{ aspectRatio: 'initial' }}
                  />
                </Card>
              </CardContent>
              {/* <img
                src={props.idolInfo?.idolPicture}
                style={{ width: '100%', filter: 'blur(5px)' }}
              /> */}
            </Card>
            {/* {props.idolInfo?.idolAge !== null ? (
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
            )} */}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default IdolInfo;
