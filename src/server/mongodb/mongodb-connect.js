/* eslint-disable no-console */
import colors from 'colors';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export const MongodbConnect = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_URL, (err) => {
      if (err) {
        return reject();
      }
      return resolve();
    });
  });
export default MongodbConnect;
