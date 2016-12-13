/* eslint-disable no-console */
import colors from 'colors';
import redis from 'redis';

const RedisConnect = () =>
  new Promise((resolve, reject) => {
    const rc = redis.createClient();
    rc.on('error', reject);
    rc.on('connect', () => {
      console.log(`redis connected: ${process.env.REDIS_PORT}`.green);
      resolve();
    });
  });
export default RedisConnect;
