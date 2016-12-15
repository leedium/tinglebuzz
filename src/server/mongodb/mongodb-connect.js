/* eslint-disable no-console */
import colors from 'colors';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
export const MongodbConnect = (url = process.env.MONGODB_URL) =>
  new Promise((resolve, reject) => {
    mongoose.connect(url, (err) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(mongoose);
    });
  });
export default MongodbConnect;
