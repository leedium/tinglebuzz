import clean from './clean';
import copy from './copy';
import client from './client';
import server from './server';
import db from './db';
import envConfig from './environment.config';

const run = async () => {
   //await clean();
   //await copy();
   //await db();
   await client().catch((e) => console.log(e))
  // console.log(envConfig.isDev)
   // if(envConfig.isDev){
   //   server();
   // }
};

run();
