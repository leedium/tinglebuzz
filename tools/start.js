import isDev from './env';
import clean from './clean';
import copy from './copy';
import client from './client';
import server from './server';

const run = async () => {
  await clean();
  await copy();
  await client();
}

run();
