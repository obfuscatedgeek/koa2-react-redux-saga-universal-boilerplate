import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory as history } from 'react-router';

import { Provider } from 'react-redux';

import rootSaga from '../shared/sagas/';
import routes from '../shared/routes.jsx';
import configureStore from '../shared/configureStore';

const store = configureStore(window.__state);
store.runSaga(rootSaga);

const dest = document.getElementById('app');
const router = (
    <Router history={history}>
      {routes}
    </Router>
  );

render(
  <Provider store={store}>
    {router}
  </Provider>, dest
);
