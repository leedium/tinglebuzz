import {ObjectID} from 'mongodb';
import Post from '../server/mongodb/model/Post';

export const createPost = (owner, postObj) => {
  const newPost = new Post({
    ...postObj,
  });
  return newPost.save().then(post => {
    owner.posts.push(post.id);
    return {owner, post};
  });
};

export const updatePost = (postId, postObj) => {
  return Post.findByIdAndUpdate({ _id: postId}, postObj, {new: true})
    .then(newPost => newPost)
    .catch(err => console.log(err));
};

export const removePost = (postId) => {
  return Post.findByIdAndRemove(postId.toString())
    .populate('owner')
    .then((deletedPost) => {
      const owner = deletedPost.owner;
      owner.posts = owner.posts.filter(post => deletedPost.id !== post.toString());
      return owner.save().then((user) => {
        return {deletedPost, user};
      });
    });
};

