import { Box, Container } from '@material-ui/core';
import Router from './router';
import Navbar from './components/Navbar';




function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Box minWidth={1080} display="flex" justifyContent="center">
        <Box width={1080}>
          <Router></Router>
        </Box>
      </Box>
    </div>
  );
}

export default App;
