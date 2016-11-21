import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';

export function * doTester () {
  yield put({type: 'DO_TEST_SUCCESS', payload: {rand: Math.ceil(Math.random()*5000)}});
} 

export function * doTester1 () {
  yield put({type: 'DO_TEST_SUCCESS1', payload: {date: new Date().toString()}});
}

function * sagaTest () {
  while (true) {
    yield * takeLatest('DO_TEST_REQ', doTester);
  }
}

export default sagaTest;
