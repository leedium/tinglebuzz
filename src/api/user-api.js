import { ObjectID } from 'mongodb';

import User from '../server/mongodb/model/User';
import UserType from '../api/types/UserType';

export const addUser = ({_id = new ObjectID, type = UserType.guest, email, password, username, fname, lname}) => {
  const { user, token } = new User({
    _id,
    type,
    email,
    password,
    username,
    fname,
    lname,
    posts: [],
  }).generateUserAuth();

  return user.save().then((u) => {
    return {
      user: u,
      token,
    }; //.toJSON();
  }).catch(err => {
    console.log(err);
    return err
  });
};

export const findUserById = (_id) => {
  return User.findById(_id.toString())
    .catch(err => err);
};

export const updateUser = (id, payload) => {
  return User.findByIdAndUpdate(id,
    Object.assign({},payload),
    { new: true },
  ).catch(err => err);
};

export const removeUser = (id) => {
  return User.findByIdAndRemove(id)
    .catch(err => err);
}
