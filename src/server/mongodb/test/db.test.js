/* eslint-disable no-console */

import expect from 'expect';
import { ObjectID } from 'mongodb';

import mongodbConnect from '../mongodb-connect';
import {clearDB} from '../model/helpers';
import User from '../model/User';
import Post from '../model/Post';
import UserType from '../../../api/types/UserType';
import PostType from '../../../api/types/PostType';

let mongoose;
const user1ID = new ObjectID();
const user2ID = new ObjectID();
const user3ID = new ObjectID();

//  lifecycle methods
const startMongo = (done) => {
  console.log('=============================>');
  mongodbConnect().then((db) => {
    mongoose = db;
    clearDB().then(() => {
      Promise.all([
        User.addUser({
          _id: user2ID,
          type: UserType.business,
          email: 'poo323@poo.com',
          password: '362y32hjh3',
          username: 'leedium22',
          fname: 'Ruth',
        }),
        User.addUser({
          _id: user3ID,
          type: UserType.guest,
          email: 'poo12@poo1.com',
          password: '362y3ss2hjh3',
          username: 'leedium2s3',
          fname: 'Christine',
        }),
      ]).then(() => {
        done();
      }).catch(err => {throw new Error(err)});
    });
  });
};


const stopMongo = (done) => {
  clearDB().then(() => {
    mongoose.connection.close();
    console.log('=============================>');
    done();
  });
};
//  end lifecycle;

describe('MongoDB User CRUD', () => {
  before(startMongo);
  after(stopMongo);

  it('Should SAVE a User with JWT Token', () => {

    const newUser = {
      _id: user1ID,
      type: UserType.business,
      email: 'leedium89@poo.com',
      password: '362y32hjh3',
      username: 'leedium2233',
      fname: 'David',
      lname: 'Lee',
    };
    return User.addUser(newUser).then(({user, token}) =>
      expect(user.email).toBe(newUser.email));
  });

  it('Should FIND a User by ID', () =>
    User.findById(user1ID.toString()).then(doc =>
      expect(doc).toNotBe(null)));

  it('Should UPDATE a User', () => {
    const fname = 'Cals';
    const lname = 'Lee-Chin';
    return User.updateUser(user1ID.toString(),
      {
        fname,
        lname,
      },
    ).then(doc => expect(doc.fname).toEqual(fname));
  });

  it('Should REMOVE a User', () =>
    User.removeUser(user1ID.toString()).then(doc =>
      expect(doc).toNotBe(null)));
});

describe('MongoDB Post (Buzz) CRUD', () => {
  let savedPostId;
  before(startMongo);
  after(stopMongo);

  it(`Should CREATE a Post: by User: ${user2ID}`, () => {
    //  find a user and return non secure information
    return User.findById(user2ID.toString(), '_id posts').then((user) => {
      const postObj = {
        _id: new ObjectID(),
        type: PostType.assistance,
        title: 'This is a Post Title',
        description: 'This is a Post Description',
        owner: user2ID,
        latlng: {},
        expires: 0,
        icon: '',
      };
      return Post.createPost(user, postObj).then(({owner, post}) => {
        expect(owner.id).toEqual(user2ID.toString());
        expect(post.title).toEqual(postObj.title);
        savedPostId = post.id;
      }).catch(err => err);
    });
  });
  //
  it('Should UPDATE a Post:', () => {
    const title = 'This is a new title';
    const description = 'This is a new Description';
    const expires = 1;
    const latlng = {lat: 1, lng: 2};
    const type = PostType.assistance;
    const icon = 'icon.jpg';
    return Post.updatePost(savedPostId, {
      type,
      title,
      description,
      latlng,
      expires,
      icon,
    }).then((updatedPost) => {
      expect(updatedPost.title).toEqual(title);
      expect(updatedPost.description).toEqual(description);
      expect(updatedPost.type).toEqual(type);
    });
  });

  it('Should REMOVE a Post', () =>
    Post.removePost(savedPostId).then(({deletedPost, user}) => {
      expect(deletedPost).toNotBe(null);
      expect(user.posts.indexOf(deletedPost.id) >= 0).toBe(false);
    }));
});
