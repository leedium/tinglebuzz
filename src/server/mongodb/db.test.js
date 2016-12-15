import expect from 'expect';
import { ObjectID } from 'mongodb';

import mongodbConnect from './mongodb-connect';
import User from './model/User';

let mongoose;
//  lifecycle
before((done) => {
  mongodbConnect().then((db) => {
    mongoose = db;
    User.remove({}).then(() => done());
  });
});

after((done) => {
  mongoose.connection.close();
  done();
});
//  end lifecycle;


//  helpers
const createNewUser = (id, email = 'leedium@me.com', password = '123456', fname = 'David', lname = 'Lee', tokens = [{
  access: 'abcd',
  token: 'lmnop',
}]) =>
  new User({
    id,
    email,
    password,
    fname,
    lname,
    tokens,
  });

describe('MondoDB User CRUD', () => {
  const USER_ID = new ObjectID();

  it('Should SAVE a User', () => {
    const newUser = createNewUser(USER_ID);
    return newUser.save().then((doc) => {
      expect(doc.email).toBe(newUser.email);
    });
  });

  it('Should FIND a User by ID', () =>
    User.find({
      email: 'leedium@me.com',
    }).then((doc) => {
      expect(doc).toNotBe(null);
    }));

  it('Should Update a User', () => {
    const fname = 'Cals';
    const lname = 'Lee-Chin';
    return User.findOneAndUpdate(
      {
        email: 'leedium@me.com',
      },
      {
        fname,
        lname,
      },
      { new: true },
    ).then((doc) => {
      expect(doc.fname).toEqual(fname);
    });
  });

  it('Should REMOVE a User', () =>
    User.findOneAndRemove({
      _id: USER_ID,
    }).then(doc => expect(doc).toBe(null)));
});
