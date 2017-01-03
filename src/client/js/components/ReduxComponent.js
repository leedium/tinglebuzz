import React from 'react';
import {connect} from 'react-redux';



class ReduxComponent extends React.Component {

}

ReduxComponent.mapStateToProps = function(state){
  return {
    user: state.user,
  };
};

export default ReduxComponent;


