/*
sets and returns an environment flag
 */

const env = {
  production: {
    isDev: false,
  },
  development: {
    isDev: true,
  },
}[process.env.NODE_ENV];

module.exports =  env;
