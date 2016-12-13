import clean from './clean';
import copy from './copy';
import client from './client';
import db from './db';

const run = async () => {
   await clean();
   await copy();
   await db();
   await client();
};

run();
