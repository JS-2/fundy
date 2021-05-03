import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

const IdolSearchItem = () => {
  const [isOver, setIsOver] = useState(false);

  return (
    <Card
      style={{ width: '225px', height: '350px', position: 'relative' }}
      onMouseOver={() => {
        setIsOver(!isOver);
      }}
      onMouseOut={() => {
        setIsOver(!isOver);
      }}
    >
      <CardMedia
        component="img"
        alt="펀딩 카드 이미지"
        image="https://ibighit.com/bts/images/bts/profile/member-jhope.jpg"
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
          이름
        </div>
      </div>
    </Card>
  );
};

export default IdolSearchItem;
