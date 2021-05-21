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
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
} from '@material-ui/core';

interface PostUser {
  userId: number;
  userNickname: string;
  userPicture: string | undefined;
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
                        src={post.user.userPicture}
                        style={{ width: '100px', height: '100px' }}
                      ></Avatar>
                      <Box ml={2} mt={1}>
                        <Box className="nbg_bold font-smooth" fontSize="1.3em">
                          {post.user.userNickname}
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
                        style={{ marginRight: '10px', width: '80px' }}
                      >
                        승인
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleDeclineBtn(post.user.userId);
                        }}
                        style={{ width: '80px' }}
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
                              __html: post.officialFanHistory,
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

export default CertFanBoard;
