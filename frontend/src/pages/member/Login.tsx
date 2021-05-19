import { Box } from '@material-ui/core';
import SignIn from '../../components/member/login/SignIn';

const Login = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Box mt={10} width={480} minHeight={480}>
        <SignIn />
      </Box>
    </Box>
  );
};

export default Login;
