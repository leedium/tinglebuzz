function UserReducer(state = {}, action) {

  switch (action.type) {
    case 1: {
      return Object.assign({}, state);
    }
    case 2: {
      return Object.assign({}, state);
    }
    default:
      return state;
  }

}

export default UserReducer;