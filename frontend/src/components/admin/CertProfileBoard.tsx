import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
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
      <Grid container xs={12}>
        {posts.map((post: Post) => (
          <>
            <Grid item container xs={6} style={{ justifyContent: 'center' }}>
              <Accordion style={{ width: '600px' }}>
                <AccordionSummary>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    style={{ width: '100%' }}
                  >
                    <Box display="flex">
                      <Avatar
                        src={post.profile.profilePicture}
                        style={{ width: '100px', height: '100px' }}
                        variant="square"
                      ></Avatar>
                      <Box ml={2} mt={1}>
                        <Box className="nbg_bold font-smooth" fontSize="1.3em">
                          {post.user.userNickname}
                        </Box>
                        <Box
                          mt={1}
                          className="nbg_m font-smooth"
                          fontSize="1.1em"
                        >
                          이름: {post.profile.profileName}
                        </Box>
                        <Box className="nbg_m font-smooth" fontSize="1.1em">
                          나이: {post.profile.profileAge}
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <Button
                        className="btn_main"
                        variant="contained"
                        onClick={() => {
                          handleAcceptBtn(post.user.userId);
                        }}
                        style={{ marginRight: '10px' }}
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
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box style={{ width: '100%' }}>
                    <Box mt={2}>
                      <Card
                        elevation={0}
                        style={{
                          width: '100%',
                          minHeight: '400px',
                          border: 'solid 1px silver',
                        }}
                      >
                        <CardContent>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: post.profile.profileHistory,
                            }}
                          ></div>
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
};

export default CertProfileBoard;
