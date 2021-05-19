import { Avatar, Box, Card, Grid, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { IComment, User } from '../../common/types';
import ClearIcon from '@material-ui/icons/Clear';
import { deleteComment } from '../../api/funding';

interface Props {
  user: User;
  com: IComment;
  token: string;
  refreshComments: () => void;
}

const QnaComment = (props: Props) => {
  const { user, com, token, refreshComments } = props;
  const [isOver, setIsOver] = useState<boolean>(false);

  const handleDelete = () => {
    deleteComment(com.fundingCommentId, token).then(() => {
      refreshComments();
    });
  };

  return user === null || user.nickname !== com.userNickname ? (
    <Grid className="commentArea" item xs={12}>
      <Box display="flex" alignItems="center">
        <Avatar src={com.userPicture}></Avatar>
        <Box p={1}>{com.userNickname}</Box>
      </Box>
      <Box className="commentArea" display="flex" p={1} alignItems="flex-end">
        <Card elevation={0} style={{ backgroundColor: '#3322dd', color: 'Ivory' }}>
          <Box m={1}>{com.fundingCommentContent}</Box>
        </Card>
        <Box mx={1} style={{ fontSize: '0.7em' }}>
          {com.fundingCommentTime}
        </Box>
      </Box>
    </Grid>
  ) : (
    <Grid
      item
      xs={12}
      onMouseOver={() => {
        setIsOver(true);
      }}
      onMouseOut={() => {
        setIsOver(false);
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Box p={1}>{com.userNickname}</Box>
        <Avatar src={com.userPicture}></Avatar>
      </Box>
      <Box display="flex" p={1} justifyContent="flex-end" alignItems="flex-end">
        <Box
          style={
            isOver
              ? { transition: 'all 0.2s ease-out' }
              : {
                  opacity: 0,
                  visibility: 'hidden',
                  transition: 'all 0.2s ease-out',
                }
          }
        >
          <IconButton size="small" onClick={handleDelete}>
            <ClearIcon />
          </IconButton>
        </Box>

        <Box mx={1} style={{ fontSize: '1.4rem' }}>
          {com.fundingCommentTime}
        </Box>
        <Card
          elevation={0}
          style={{
            backgroundColor: '#f74a64',
            maxWidth: '60%',
            color: '#eeeeee',
            fontSize:'1.4rem',
           
            
          }}
        >
          <Box m={1} style={{ wordBreak: 'break-all', borderRadius:'20px', }}>
            {com.fundingCommentContent}
          </Box>
        </Card>
      </Box>
    </Grid>
  );
};

export default QnaComment;
