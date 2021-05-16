import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../reducers';
import {
  acceptFanCert,
  getFanCertPosts,
  declineFanCert,
} from '../../api/admin';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
} from '@material-ui/core';

interface PostUser {
  userId: number;
  userNickname: string;
}
interface Post {
  user: PostUser;
  officialFanHistory: string;
}

const CertFanBoard = () => {
  const [posts, setPosts] = useState<any>([]);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );

  const handleAcceptBtn = (user_id: number) => {
    acceptFanCert(user_id, token).then(() => {
      window.location.reload();
    });
  };

  const handleDeclineBtn = (user_id: number) => {
    declineFanCert(user_id, token).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    getFanCertPosts(token).then((resp) => {
      setPosts(resp.data);
    });
  }, [token]);

  return (
    <div>
      {posts.map((post: Post) => (
        <Accordion>
          <AccordionSummary>{post.user.userNickname}</AccordionSummary>
          <AccordionActions>
            <Button
              variant="contained"
              onClick={() => {
                handleAcceptBtn(post.user.userId);
              }}
            >
              승인
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleDeclineBtn(post.user.userId);
              }}
            >
              거부
            </Button>
          </AccordionActions>
          <AccordionDetails>
            <div
              dangerouslySetInnerHTML={{ __html: post.officialFanHistory }}
            ></div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CertFanBoard;
