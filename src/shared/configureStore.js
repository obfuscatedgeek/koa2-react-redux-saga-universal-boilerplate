import Immutable from 'immutable';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from './ducks/reducers';

const sagaMiddleware = createSagaMiddleware();

function immutifyState (obj) {
  const objMut = Object.assign({}, obj);

  Object
    .keys(objMut)
    .forEach(key => {
      objMut[key] = Immutable.fromJS(objMut[key]);
    });

  return objMut;
};

export default (initialState) => {
  const immutated_state = immutifyState(initialState);

  const store = createStore(
		rootReducer,
		immutated_state,
    compose(
      applyMiddleware(
        sagaMiddleware
      )
    )		
	);

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};
