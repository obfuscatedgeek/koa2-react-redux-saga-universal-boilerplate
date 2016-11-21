import { fork } from 'redux-saga/effects';

import test from './test_saga';

export default function * rootSaga () {
  yield [
    fork(test)
  ];
};

