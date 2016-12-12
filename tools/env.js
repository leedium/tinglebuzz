/*
sets and returns an environent flag
 */

const env = {
  production: false,
  development: true,
}[process.env.NODE_ENV];

export default env;
