import React from 'react';

import { validateUserToken } from '../../../api/actions/userActions';

class ReduxComponent extends React.Component {

}

ReduxComponent.mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

ReduxComponent.mapDispatchToProps = (dispatch) => {
  return {
    validateUserToken: () => {
      dispatch(validateUserToken());
    },
  };
};

export default ReduxComponent;
