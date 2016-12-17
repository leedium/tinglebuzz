import expect from 'expect';
import { ObjectID } from 'mongodb';

import {createPost, createUser} from './model/helpers';
import mongodbConnect from './mongodb-connect';
import User from './model/User';
import Post from './model/Post';
import UserType from '../../api/types/UserType';

let mongoose;

const user1ID = new ObjectID();
const user2ID = new ObjectID();
const user3ID = new ObjectID();

const postID = new ObjectID();

//  lifecycle methods
before((done) => {
  const users = [
    createUser(user2ID, UserType.business, 'poo@poo.com', '362y32hjh3', 'Ruth'),
    createUser(user3ID, UserType.guest, 'poo1@poo1.com', '362y32hjh3', 'Christine'),
  ];

  mongodbConnect().then((db) => {
    mongoose = db;
    Post.remove({}).then(() => {
      User.remove({}).then(() => {
        User.insertMany(users).then(() => done());
      });
    });
  });
});

after((done) => {
  mongoose.connection.close();
  done();
});
//  end lifecycle;


describe('MongoDB User CRUD', () => {
  it('Should SAVE a User', () => {
    const newUser = createUser(user1ID);
    return newUser.save().then((doc) => {
      expect(doc.email).toBe(newUser.email);
    });
  });

  it('Should FIND a User by ID', () =>
    User.findById(user1ID.toString()).then(doc =>
      expect(doc).toNotBe(null)));

  it('Should UPDATE a User', () => {
    const fname = 'Cals';
    const lname = 'Lee-Chin';
    return User.findByIdAndUpdate(user1ID,
      {
        fname,
        lname,
      },
      { new: true },
    ).then((doc) => {
      expect(doc.fname).toEqual(fname);
    });
  });

  it('Should REMOVE a User', () =>
    User.findByIdAndRemove(user1ID.toString()).then((doc) => {
      expect(doc).toNotBe(null);
    }));
});

describe('MongoDB Post (Buzz) CRUD', () => {
  it(`Should CREATE a Post: by User: ${user2ID}`, () => {
    //  find a user and return non secure information
    return User.findById(user2ID.toString()).then((user) => {
      expect(user).toNotBe(null); //  make sure user exists
      const newPost = createPost(user.id, postID);// create a new post with the user
      return newPost.save().then((post) => {
        return Post.findById(post.id)
          .populate('owner', 'email fname lname ')
          .then((updatedPost) => {
            expect(updatedPost.owner.id).toEqual(user2ID);
            user.posts.push(updatedPost.id);
            return user.save().then((updatedDoc) => {
              expect(updatedPost.owner.id).toEqual(updatedDoc.id);
            });
          });
      });
    });
  });

  it('Should UPDATE a Post', () => {
    const title = 'This is a new title';
    const description = 'This is a new Description';
    return Post.findByIdAndUpdate(postID, {
      title,
      description,
    }, {new: true}).then((updatedPost) => {
      expect(updatedPost.title === title);
    });
  });

  it('Should REMOVE a Post', () =>
    Post.findByIdAndRemove(postID)
      .populate('owner')
      .then((deletedPost) => {
        expect(deletedPost).toNotBe(null);
        deletedPost.owner.posts = deletedPost.owner.posts.filter(post => deletedPost.id !== post.toString())
        return deletedPost.owner.save().then((user) => {
          expect(user.posts.indexOf(deletedPost.id) >= 0).toBe(false);
        });
      }));
});
