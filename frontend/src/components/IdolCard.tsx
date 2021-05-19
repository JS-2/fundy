import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Idol } from '../common/types';
import FavoriteIcon from '@material-ui/icons/Favorite';

interface Props {
  idol: Idol;
}

const IdolCard = (props: Props) => {
  const [isOver, setIsOver] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, []);
  const toDetail = () => {
    history.push('/idol/' + props.idol.idolId);
  };

  return (
    <Card
      onClick={toDetail}
      style={{
        width: '100%',
        height: show ? '350px' : '0px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'opacity 1s ease-in-out, height 0.5s ease-in-out',
        opacity: show ? 1 : 0,
      }}
      onMouseOver={() => {
        setIsOver(!isOver);
      }}
      onMouseOut={() => {
        setIsOver(!isOver);
      }}
    >
      <CardMedia
        component="img"
        alt="아이돌 카드 이미지"
        image={props.idol.idolPicture}
        title="Card Image"
        height="375px"
        style={
          isOver
            ? { transition: 'all 0.4s ease-out' }
            : { filter: 'brightness(40%)', transition: 'all 0.4s ease-out' }
        }
      />
      <div
        className="nbg_bold font-smooth"
        style={
          isOver
            ? {
                position: 'absolute',
                bottom: -25,
                right: 12,
                fontSize: '2.5em',
                color: 'white',
                opacity: 0,
                transition: 'all 0.3s ease-out',
              }
            : {
                position: 'absolute',
                bottom: 5,
                right: 12,
                fontSize: '2.5em',
                color: 'white',
                opacity: 0.88,
                transition: 'all 0.3s ease-out',
              }
        }
      >
        {props.idol.idolName}
      </div>
    </Card>
  );
};

export default IdolCard;
