import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  fname: String,
  lname: String,
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

let u;
try {
  u = mongoose.model('User');
} catch (err) {
  u = mongoose.model('User', userSchema);
}
const User = u;
export default User;
