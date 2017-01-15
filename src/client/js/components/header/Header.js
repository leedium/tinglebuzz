import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import ReduxComponent from '../ReduxComponent';
import * as userActions from '../../../../api/actions/userActions';

class Header extends ReduxComponent {
  constructor(props, context){
    super(props, context);
  }
  render() {
    const logInOutBtn = ( this.props.user.auth === null ?
      <li><Link to="/login">Login</Link></li> :
      <li><Link to="/logout">Logout</Link></li> );
    return (
      <header>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            {logInOutBtn}
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default connect(ReduxComponent.mapStateToProps, userActions)(Header);
