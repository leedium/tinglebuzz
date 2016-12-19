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
