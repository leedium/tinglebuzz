import expect from 'expect';
import { ObjectID } from 'mongodb';

import { createPost } from '../model/helpers';
import mongodbConnect from '../mongodb-connect';
import User from '../model/User';
import Post from '../model/Post';
import UserType from '../../../api/types/UserType';
import PostType from '../../../api/types/PostType';
import { addUser, findUserById, updateUser, removeUser } from '../../../api/user-api';
import { createPost2 } from '../../../api/post-api';

let mongoose;
const user1ID = new ObjectID();
const user2ID = new ObjectID();
const user3ID = new ObjectID();
const postID = new ObjectID();

//  lifecycle methods
const startMongo = (done) => {
    mongodbConnect().then((db) => {
      mongoose = db;
      Promise.all([
        Post.remove({}),
        User.remove({}),
        addUser({_id: user2ID, type: UserType.business, email: 'poo@poo.com', password: '362y32hjh3', username: 'leedium22', fname: 'Ruth'}),
        addUser({_id: user3ID, type: UserType.guest, email: 'poo1@poo1.com', password: '362y32hjh3', username: 'leedium23', fname: 'Christine'}),
      ]).then(() => {
        done();
      }).catch(err => err);
    });
}

const stopMongo = (done) => {
  mongoose.connection.close();
  done();
}
//  end lifecycle;

// describe('MongoDB User CRUD', () => {
//   before(startMongo);
//   after(stopMongo);
//
//   it('Should SAVE a User with JWT Token', () =>
//     addUser({
//       _id: user1ID,
//       type: UserType.business,
//       email: 'leedium@poo.com',
//       password: '362y32hjh3',
//       username: 'leedium2233',
//       fname: 'David',
//       lname: 'Lee',
//     }).then(({ user, token }) =>
//       expect(user.email).toBe('leedium@poo.com')));
//
//   it('Should FIND a User by ID', () =>
//     findUserById(user1ID.toString()).then(doc =>
//         expect(doc).toNotBe(null)));
//
//   it('Should UPDATE a User', () => {
//     const fname = 'Cals';
//     const lname = 'Lee-Chin';
//     return updateUser(user1ID.toString(),
//       {
//         fname,
//         lname,
//       },
//     ).then(doc => expect(doc.fname).toEqual(fname));
//   });
//
//   it('Should REMOVE a User', () =>
//     removeUser(user1ID.toString()).then(doc =>
//       expect(doc).toNotBe(null)));
// });

describe('MongoDB Post (Buzz) CRUD', () => {
  before(startMongo);
  after(stopMongo);

  it(`Should CREATE a Post: by User: ${user2ID}`, () => {

    //  find a user and return non secure information
    User.findById(user2ID.toString(), '_id posts').then((user) => {
      return createPost2({
        type: PostType.assistance,
        title: 'This is a Post Title',
        description: 'This is a Post Description',
        owner: user,
      }).then((newPost) => {
          console.log(newPost);
      }).catch(err => console.log(err))
    });
  });
  //
  // it('Should UPDATE a Post', () => {
  //   const title = 'This is a new title';
  //   const description = 'This is a new Description';
  //   return Post.findByIdAndUpdate(postID, {
  //     title,
  //     description,
  //   }, { new: true }).then((updatedPost) => {
  //     expect(updatedPost.title === title);
  //   });
  // });
  //
  // it('Should REMOVE a Post', () =>
  //   Post.findByIdAndRemove(postID)
  //     .populate('owner')
  //     .then((deletedPost) => {
  //       const owner = deletedPost.owner;
  //       owner.posts = owner.posts.filter(post => deletedPost.id !== post.toString());
  //       return owner.save().then((user) => {
  //         expect(deletedPost).toNotBe(null);
  //         expect(user.posts.indexOf(deletedPost.id) >= 0).toBe(false);
  //       });
  //     }));
});
