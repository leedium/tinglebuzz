import RedisServer from 'redis-server';
import cp from 'child_process';

import RESTServer from '../src/server/http/server-http'

//Start Redis server instance
export const startRedis = () => {
  return new Promise((resolve, reject) => {
    const server = new RedisServer(process.env.REDIS_PORT);
    server.open().then(() =>{
      console.log(`Connected to redis on port: ${process.env.REDIS_PORT}`);
      resolve();
    },reject)
  })
};


//Child process to start the mongo db test server
export const startMongo = () => {
  return new Promise((resolve, reject) => {
    let mongo = cp.spawn('mongod', ['--dbpath', './db/mongodb/data']);

    mongo.stdout.once('data', (data) => {
      console.log(`stdout: ${data}`,process.env.MONGODB_PORT || 27017);
      console.log(`mongodb running on port ${process.env.MONGODB_PORT || 27017}`);
      resolve()
    });

    mongo.stderr.once('data', (data) => {
      console.log(data);
      reject();
    });

    mongo.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
};

const startServers = async () => {
    try {
     // await startRedis();
      await startMongo();
      return Promise.resolve();
    } catch(err) {
      throw new Error(err);
    }

}

export default startServers;