import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getComments, postComment } from '../../api/funding';
import { User, IComment } from '../../common/types';
import { rootState } from '../../reducers';
import QnaComment from './QnaComment';

interface Params {
  num: string;
}

const Qna = () => {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<IComment[]>([]);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  const user: User = useSelector((state: rootState) => state.userReducer.user);
  const params: Params = useParams();

  const refreshComments = () => {
    getComments(params.num).then((resp) => {
      setComments(
        resp.data.map((data: IComment) => {
          data.fundingCommentTime = data.fundingCommentTime.replace('T', ' ');
          return data;
        })
      );
    });
  };
  useEffect(() => {
    refreshComments();
  }, [params]);

  return (
    <div
      style={{
        border: '1px solid lightgrey',
        borderRadius: '20px',
        padding: '10px 10px 0px 10px',
        marginTop: '50px',
      }}
    >
      <Grid container className="qnacontainer">
        {comments.length !== 0 ? (
          comments.map((com, i) => {
            return (
              <QnaComment
                key={i}
                user={user}
                com={com}
                token={token}
                refreshComments={refreshComments}
              />
            );
          })
        ) : (
          <Grid
            item
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            xs={12}
          >
            <Box my={3} fontSize="3em" color="silver">
              첫 댓글을 달아보세요!
            </Box>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            style={{ height: 100, padding: 0, fontSize: '14px' }}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            disabled={token === null || comment === ''}
            fullWidth
            size="large"
            variant="contained"
            style={{ height: 55, fontSize: '1.7rem' }}
            onClick={() => {
              postComment(comment, token, params.num).then(() => {
                setComment('');
                refreshComments();
              });
            }}
          >
            작성
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Qna;
