import Immutable from 'immutable';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { doTester, doTester1 } from '../sagas/test_saga.js';

import * as ACTIONS from '../ducks/test.jsx';

class IndexPage extends Component {

  constructor (props) {
    super();

    this.onBtnClick = this.onBtnClick.bind(this);
  }

  static propTypes = {
    test: PropTypes.instanceOf(Immutable.Map),
    doTestReq: PropTypes.func
  }

  onBtnClick (e) {
    console.log('button clicked!!');
    this.props.doTestReq();
  }

  render () {
    const { test } = this.props;
    console.log('>>>>', test.toJS());
    return (
      <div>
       <h1>Random number generator</h1> 
       <h3>{test.get('rand')}</h3>
       <button onClick={this.onBtnClick}>Generate random number</button>
       <p>
        Generated on the server at {test.get('data')}
       </p>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    test: state.test
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doTestReq: bindActionCreators(ACTIONS.doTestReq, dispatch)
  };
};

const preload = () => {
  return [doTester, doTester1];
};

IndexPage.preload = preload;

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
