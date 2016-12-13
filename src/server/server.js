/* eslint-disable no-console */
import RestServer from './http/server-http';
import MongoConnect from './mongodb/mongodb-connect';
import RedisConnect from './redis/redis-connect';

const run = async () => {
  try {
    await MongoConnect();
    await RedisConnect();
    await RestServer();
  } catch (err) {
    throw new Error(err);
  }
};
run();

