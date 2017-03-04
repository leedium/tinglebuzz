import React from 'react';
import {connect} from 'react-redux';

import ReduxComponent from './ReduxComponent';

class AuthComponent extends ReduxComponent {
  constructor(props, context) {
    super(props, context);
  }
}

// export default AuthComponent;
export default connect(ReduxComponent.mapStateToProps,
  ReduxComponent.mapDispatchToProps)(AuthComponent);
