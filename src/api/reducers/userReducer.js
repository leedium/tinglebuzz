import {UserActionTypes} from '../../api/actions/ActionTypes';
import initialState from '../store/initialState';

function UserReducer(state = initialState.user, action) {
  switch (action.type) {
    case UserActionTypes.LOGIN_SUCCESS: {
      return Object.assign({}, state,{
        auth: action.userData,
      });
    }
    case UserActionTypes.LOGIN_FAIL: {
      return Object.assign({}, state, {
        auth: null,
      });
    }
    default:
      return state;
  }

}

export default UserReducer;