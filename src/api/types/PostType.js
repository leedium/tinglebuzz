import keymirror from 'keymirror';

const BUZZ_TYPE = keymirror({
  assistance: null,
  lost: null,
  found: null,
  commercialPromo: null,
  commercialChat: null,
});
export const validateType = value => BUZZ_TYPE[value] !== undefined;
export default BUZZ_TYPE;
