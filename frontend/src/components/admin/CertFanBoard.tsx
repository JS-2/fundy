import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../reducers';
import { getFanCertPosts } from '../../api/admin';
const CertFanBoard = () => {
  const [posts, setPosts] = useState<any>([]);
  const token: string = useSelector(
    (state: rootState) => state.userReducer.token
  );

  useEffect(() => {
    getFanCertPosts(token).then((resp) => {
      console.log(resp);
    });
  }, [token]);

  return <div>여기는 팬활동 인증</div>;
};

export default CertFanBoard;
