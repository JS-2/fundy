import { Box } from '@material-ui/core';
import { useState } from 'react';
import { RegistUser } from '../../common/types';
import AuthEmail from '../../components/member/regist/AuthEmail';
import SignUp from '../../components/member/regist/SignUp';

const Regist = () => {
  const [user, setUser] = useState<RegistUser>({
    email: '',
    password: '',
    nickname: '',
  });
  const [certified, setCertified] = useState<boolean>(false);

  const setUserEmail = (email: string): void => {
    setUser({ ...user, email: email });
    setCertified(true);
  };
  return (
    <Box display="flex" justifyContent="center">
      <Box mt={10} width={480} minHeight={480}>
        {certified ? (
          <SignUp user={user} />
        ) : (
          <AuthEmail setUserEmail={setUserEmail} />
        )}
      </Box>
    </Box>
  );
};

export default Regist;
