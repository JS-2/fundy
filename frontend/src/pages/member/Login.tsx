import { Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import SignIn from '../../components/member/login/SignIn';

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 10);
  }, []);
  return (
    <Box
      display="flex"
      justifyContent="center"
      style={{
        opacity: show ? 1 : 0,
        transition: show ? 'all 0.5s ease-in-out' : '',
      }}
    >
      <Box mt={10} width={480} minHeight={480}>
        <SignIn />
      </Box>
    </Box>
  );
};

export default Login;
