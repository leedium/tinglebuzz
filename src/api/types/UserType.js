import keymirror from 'keymirror';

const USER_TYPE = keymirror({
  guest: null,
  member: null,
  business: null,
});
export const validateType = value => USER_TYPE[value] !== undefined;
export default USER_TYPE;
