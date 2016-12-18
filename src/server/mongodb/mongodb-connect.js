/* eslint-disable no-console */
import colors from 'colors';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
export const MongodbConnect = (url = process.env.MONGODB_URL || 'mongodb://localhost:27017/tinglebuzz-test') =>
  new Promise((resolve, reject) => {
    mongoose.connect(url, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(mongoose);
    });
  });
export default MongodbConnect;
