import { ObjectID } from 'mongodb';

import UserType from '../../../api/types/UserType';
import PostType from '../../../api/types/PostType';
import User from './User';
import Post from './Post';

export const clearDB = () =>
  Promise.all([
    User.remove({}),
    Post.remove({}),
  ]);

//  helpers
export const createUser = (_id = new ObjectID(), type = UserType.member, email = 'leedium@me.com', password = '12345678', username = 'leedium234', fname = 'David', lname = 'Lee', posts = []) =>
  new User({
    _id,
    type,
    email,
    password,
    username,
    fname,
    lname,
    posts,
  }).generateUserAuth();


export const createPost = (owner, _id = new ObjectID(), type = PostType.assistance, title = 'A Post', description = 'This is a Post') =>
  new Post({
    _id,
    owner,
    type,
    title,
    description,
  });
