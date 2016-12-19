import mongoose from 'mongoose';
import {validateType} from '../../../api/types/PostType';

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
  latlng: {
    type: Object,
  },
  expires: {
    type: Number,
  },
  icon: {
    type: String,
  },
});


PostSchema.statics.createPost = function (owner, postObj) {
  const Post = this;
  const newPost = new Post({
    ...postObj,
  });
  return newPost.save().then(post => {
    owner.posts.push(post.id);
    return {owner, post};
  })
    .catch((err) => {throw new Error(err);});
};

PostSchema.statics.updatePost = function (postId, postObj) {
  const Post = this;
  return Post.findByIdAndUpdate({ _id: postId}, postObj, {new: true})
    .then(newPost => newPost)
    .catch((err) => {throw new Error(err)});
};

PostSchema.statics.removePost = function (postId) {
  const Post = this;
  return Post.findByIdAndRemove(postId.toString())
    .populate('owner')
    .then((deletedPost) => {
      const owner = deletedPost.owner;
      owner.posts = owner.posts.filter(post => deletedPost.id !== post.toString());
      return owner.save().then((user) => {
        return {deletedPost, user};
      });
    })
    .catch((err) => {throw new Error(err);});
};


let post;
try {
  post = mongoose.model('Post');
} catch (err) {
  post = mongoose.model('Post', PostSchema);
}
export default post;
