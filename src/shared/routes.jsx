import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import IndexPage from './pages/index';

export default (
  <Router history={browserHistory} >
    <Route path="/" component={IndexPage} />
  </Router>
);
