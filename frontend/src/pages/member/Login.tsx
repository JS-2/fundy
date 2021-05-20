import { Box } from '@material-ui/core';
import SignIn from '../../components/member/login/SignIn';

const Login = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Box className="loginn" mt={10} width={520} minHeight={520}>
        <SignIn />
      </Box>
    </Box>
  );
};

export default Login;
