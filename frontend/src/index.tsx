import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Test from './pages/Test';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(

  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='/' component={App} exact />
        <Route path='/test' component={Test} exact />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
