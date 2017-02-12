import React from 'react';
import {connect} from 'react-redux';

import ReduxComponent from '../ReduxComponent';
import * as userActions from '../../../../api/actions/userActions';

class LogoutPage extends ReduxComponent {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.requestLogout();
  }

  render() {
    return (
      <div className="logout-page">
        Thanks, come again
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, userActions)(LogoutPage);
