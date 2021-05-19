import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getProfilePosts,
  acceptProfileCert,
  declineProfileCert,
} from '../../api/admin';
import { rootState } from '../../reducers';
interface PostUser {
  userId: number;
  userNickname: string;
}

interface PostProfile {
  profileAge: number;
  profileHistory: string;
  profileName: string;
  profilePicture: string | undefined;
}

interface Post {
  user: PostUser;
  profile: PostProfile;
}

const CertProfileBoard = () => {
  const [posts, setPosts] = useState<any>([]);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );
  useEffect(() => {
    getProfilePosts(token).then((resp) => {
      setPosts(resp.data);
    });
  }, [token]);

  const handleAcceptBtn = (user_id: number) => {
    acceptProfileCert(user_id, token).then(() => {
      window.location.reload();
    });
  };

  const handleDeclineBtn = (user_id: number) => {
    declineProfileCert(user_id, token).then(() => {
      window.location.reload();
    });
  };
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
            <Box>
              <Box display="flex">
                <Avatar src={post.profile.profilePicture}></Avatar>
                <Box ml={2}>
                  <Box>이름: {post.profile.profileName}</Box>
                  <Box>나이: {post.profile.profileAge}</Box>
                </Box>
              </Box>
              <Box mt={2}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.profile.profileHistory,
                  }}
                ></div>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CertProfileBoard;
