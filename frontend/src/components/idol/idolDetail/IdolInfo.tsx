import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
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
import './IdolInfo.css';

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
        <Box display="flex" justifyContent="center">
          <Card
            elevation={0}
            style={{ width: '100%', height: '600px', position: 'relative' }}
          >
            <CardMedia
              className="cardImg"
              component="img"
              width="100%"
              height="600px"
              image={props.idolInfo?.idolPicture}
              style={{ filter: 'blur(5px) brightness(40%)' }}
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
              <Grid container alignItems="center" style={{ height: '100%' }}>
                <Grid
                  item
                  container
                  xs={6}
                  style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Card
                    className="idolCardImg"
                    style={{ height: '90%', width: '80%' }}
                  >
                    <CardMedia
                      component="img"
                      image={props.idolInfo?.idolPicture}
                      style={{ height: '100%' }}
                    />
                  </Card>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid
                  item
                  xs={4}
                  style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Box width="300px">
                    <Box
                      className="nbg_bold font-smooth"
                      mb={3}
                      style={{ color: 'white', fontSize: '4em', opacity: 0.9 }}
                    >
                      {props.idolInfo?.idolName}
                    </Box>
                    {props.idolInfo?.idolAge === null ? (
                      <Box
                        className="nbg_m font-smooth"
                        style={{
                          color: 'white',
                          fontSize: '1.7em',
                          opacity: 0.8,
                        }}
                      >
                        Since{' '}
                        {props.idolInfo?.idolBirthday?.replaceAll('-', '.')}
                      </Box>
                    ) : (
                      <Box className="nbg_m font-smooth">
                        <Box
                          mb={1}
                          style={{
                            color: 'white',
                            fontSize: '1.4em',
                            opacity: 0.8,
                          }}
                        >
                          ?????? {props.idolInfo?.idolAge}
                        </Box>
                        <Box
                          mb={1}
                          style={{
                            color: 'white',
                            fontSize: '1.4em',
                            opacity: 0.8,
                          }}
                        >
                          ????????????{' '}
                          {props.idolInfo?.idolBirthday?.replaceAll('-', '.')}
                        </Box>
                        <Box
                          mb={1}
                          style={{
                            color: 'white',
                            fontSize: '1.4em',
                            opacity: 0.8,
                          }}
                        >
                          ????????? {props.idolInfo?.idolBlood}
                        </Box>
                        <Box
                          mb={1}
                          style={{
                            color: 'white',
                            fontSize: '1.4em',
                            opacity: 0.8,
                          }}
                        >
                          ??? {props.idolInfo?.idolHeight}cm
                        </Box>
                        <Box
                          mb={1}
                          style={{
                            color: 'white',
                            fontSize: '1.4em',
                            opacity: 0.8,
                          }}
                        >
                          ????????? {props.idolInfo?.idolWeight}kg
                        </Box>
                        <Box
                          mb={1}
                          style={{
                            color: 'white',
                            fontSize: '1.4em',
                            opacity: 0.8,
                          }}
                        >
                          ????????? {props.idolInfo?.idolAgency}
                        </Box>
                      </Box>
                    )}
                    {user === null ? (
                      <></>
                    ) : (
                      <Box display="flex" mt={5}>
                        <Button
                          variant="contained"
                          onClick={handleFavorite}
                          color={idolFavorite ? 'primary' : 'secondary'}
                          size="large"
                          style={{
                            width: '100%',
                            height: '45px',
                            fontSize: '1.1em',
                            opacity: idolFavorite ? 0.85 : 0.85,
                          }}
                        >
                          ?????? ????????? {idolFavorite ? '??????' : '??????'}
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </div>
    </div>
  );
};

export default IdolInfo;
