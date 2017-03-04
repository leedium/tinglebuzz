import React from 'react';
import {connect} from 'react-redux';

import * as userActions from '../../../../api/actions/userActions';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div className="home-page">
        This is the Home Page
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, userActions)(Home);
