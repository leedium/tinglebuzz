import keymirror from 'keymirror';

const UserActionTypes = keymirror({
  LOGIN_SUCCESS: null,
  LOGIN_FAIL: null,
  LOGOUT: null,
  VALIDATE_USER_ACCESS_TOKEN: null,
});

export { UserActionTypes, };
