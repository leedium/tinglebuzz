import mongoose from 'mongoose';
import { validateType } from '../../../api/types/PostType';

const PostSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    validate: {
      validator: validateType,
    },
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  description: {
    type: String,
    required: true,
  },
});

let post;
try {
  post = mongoose.model('Post');
} catch (err) {
  post = mongoose.model('Post', PostSchema);
}
export default post;
