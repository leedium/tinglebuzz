import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import validator from 'validator';
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
  let {_id, email, username } = this.toObject();
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
  return user;
}

let user;
try {
  user = mongoose.model('User');
} catch (err) {
  user = mongoose.model('User', UserSchema);
}
export default user;
