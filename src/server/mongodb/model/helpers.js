import { ObjectID } from 'mongodb';

import UserType from '../../../api/types/UserType';
import PostType from '../../../api/types/PostType';
import User from './User';
import Post from './Post';

//  helpers
export const createUser = (_id, type = UserType.member, email = 'leedium@me.com', password = '12345678', fname = 'David', lname = 'Lee', posts = [], tokens = [{
  access: 'abcd',
  token: 'lmnop',
}]) =>
  new User({
    _id,
    type,
    email,
    password,
    fname,
    lname,
    posts,
    tokens,
  });

export const createPost = (owner, _id = new ObjectID(), type = PostType.assistance, title = 'A Post', description = 'This is a Post') =>
  new Post({
    _id,
    owner,
    type,
    title,
    description,
  });
