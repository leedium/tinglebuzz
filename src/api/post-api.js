import { ObjectID } from 'mongodb';
import Post from '../server/mongodb/model/Post';

export const createPost2 = ({ _id = new ObjectID, owner, type, title, description }) => {
    const newPost = new Post({
      _id,
      owner: owner._id,
      type,
      title,
      description,
    });
    return new Promise((resolve, reject) => {
      newPost.save().then(post => {
        owner.posts.push(post.id);
        owner.save().then(resolve, reject);
      })
    });
};
