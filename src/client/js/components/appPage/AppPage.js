import React from 'react';
import {connect} from 'react-redux';

import AuthComponent from '../AuthComponent';
import ReduxComponent from '../ReduxComponent';

import userActions from '../../../../api/actions/userActions';

class AppPage extends AuthComponent {
  constructor(props, context) {
    super(props, context);
    this.props.validateUserToken();
  }

  render() {
    let markup = (<div className="app-page">
      This is a secure page only
    </div>)
    console.log(this.props.user.auth)
    if(this.props.user.auth){
      markup = (<div className="app-page">
        app
      </div>)
    }

    return markup;
  }
}

export default connect(ReduxComponent.mapStateToProps, ReduxComponent.mapDispatchToProps)(AppPage);

