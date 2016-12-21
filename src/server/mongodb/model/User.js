import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ObjectID } from 'mongodb';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import UserType from '../../../api/types/UserType';
import { validateType } from '../../../api/types/UserType';

const UserSchema = new mongoose.Schema({
  type: {
    required: true,
    type: String,
    validate: {
      validator: validateType,
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
  },
  username: {
    type: String,
    required: true,
    minlength: 8,
  },
  fname: String,
  lname: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
});

UserSchema.methods.toJSON = function () {
  let { _id, email, username } = this.toObject();
  return {
    _id,
    email,
    username,
  };
};

UserSchema.methods.generateUserAuth = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({
    id: user._id.toHexString(),
    password: user.password,
    access,
  }, '1234abc');
  user.tokens.push({
    access,
    token,
  });
  return { user, token };
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, '1234abc');
  } catch (err) {
    return Promise.reject(new Error(err));
  }
  return User.findOne({
    _id: decoded.id,
    'tokens.token': token,
    'tokens.access': 'auth',
  }, 'id email').catch(err => err);
};

UserSchema.statics.findByCredentials = function({email, password}) {
  const User = this;
  return User.findOne({email},'password')
    .then(user => {
      if(!user){
        return Promise.reject();
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare()
      });
    });
};

UserSchema.statics.addUser = function ({_id = new ObjectID(), type = UserType.guest, email, password, username, fname, lname}) {
  const User = this;
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
    };
  }).catch(err => {
    return err;
  });
};


UserSchema.statics.updateUser = function (id, payload) {
  const User = this;
  return User.findByIdAndUpdate(id,
    Object.assign({},payload),
    { new: true },
  ).catch(err => err);
};

UserSchema.statics.removeUser = function (id) {
  const User = this;
  return User.findByIdAndRemove(id)
    .catch(err => err);
};

//
UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10).then( (salt) => {
       bcrypt.hash( user.password, salt).then((hash) => {
         user.password = hash;
         next();
       });
    }).catch( err => console.log(err));
  }else{
    next();
  }
});

let user;
try {
  user = mongoose.model('User');
} catch (err) {
  user = mongoose.model('User', UserSchema);
}
export default user;
