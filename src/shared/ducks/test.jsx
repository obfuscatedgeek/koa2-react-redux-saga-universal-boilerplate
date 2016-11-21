import Immutable from 'immutable';

const initial_state = new Immutable.Map();

export const doTestReq = (data) => {
  return {
    type: 'DO_TEST_REQ',
    payload: ''
  };
};

const func = (state = initial_state, action) => {
  switch (action.type) {
  case 'DO_TEST_SUCCESS':
    return state.set('rand', action.payload.rand);
  case 'DO_TEST_SUCCESS1':
    return state.set('data', action.payload.date);
  }
  return state;
};

export default func;

