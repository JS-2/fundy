import { Box, Container } from '@material-ui/core';
import Router from './router';
import Navbar from './components/Navbar';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
