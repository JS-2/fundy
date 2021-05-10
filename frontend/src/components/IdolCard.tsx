import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Idol } from '../common/types';

interface Props {
  idol: Idol;
}
const IdolCard = (props: Props) => {
  const [isOver, setIsOver] = useState(false);
  const history = useHistory();
  const toDetail = () => {
    history.push('/idol/' + props.idol.idolId);
  };

  return (
    <Card
      onClick={toDetail}
      style={{
        width: '225px',
        height: '350px',
        position: 'relative',
        cursor: 'pointer',
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
        className="nbg_bold"
        style={{
          position: 'absolute',
          bottom: 5,
          left: 10,
          fontSize: '2em',
          color: 'white',
        }}
      >
        <div
          style={
            isOver
              ? { opacity: 0, transition: 'all 0.2s ease-out' }
              : { transition: 'all 0.2s ease-out' }
          }
        >
          {props.idol.idolName}
        </div>
      </div>
    </Card>
  );
};

export default IdolCard;
