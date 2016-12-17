import mongoose from 'mongoose';
import validator from 'validator';
import { validateType } from '../../../api/types/UserType';

const userSchema = new mongoose.Schema({
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

let user;
try {
  user = mongoose.model('User');
} catch (err) {
  user = mongoose.model('User', userSchema);
}
export default user;
