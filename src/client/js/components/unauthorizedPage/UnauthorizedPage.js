import React from 'react';
import {connect} from 'react-redux';

import ReduxComponent from '../ReduxComponent';
import * as userActions from '../../../../api/actions/userActions';

class UnauthorizedPage extends ReduxComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="unauthorized-page">
        Sorry you are unauthorized
      </div>
    );
  }
}


export default connect(ReduxComponent.mapStateToProps, userActions)(UnauthorizedPage);
