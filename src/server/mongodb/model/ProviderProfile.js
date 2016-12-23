import mongoose from 'mongoose';
import {ObjectID} from 'mongodb';

import User from './User';
import UserType from '../../../api/types/UserType';


const ProviderProfileSchema = new mongoose.Schema({
  profile_id: {
    type: String,
  },
  provider_name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

ProviderProfileSchema.statics.findOrCreate = function (profile) {
  const ProviderProfile = this;
  return new Promise((resolve, reject) => {
    ProviderProfile.findOne({profile_id: profile.id})
      .populate('user', 'email fname lname, tokens')
      .then((provider) => {
        if (provider) {
          provider.user.generateUserAuth().then((auth) => {
            resolve(auth);
          });
        } else {
          User.addUser({
            _id: new ObjectID(),
            type: UserType.guest,
            email: profile._json.email,
            fname: profile._json.first_name,
            lname: profile._json.last_name,
            password: Date.now() + Math.floor(Math.random() * 300000),
          })
          .then(({user, token}) => {
            const providerProfile = new ProviderProfile({
              provider_name: profile.provider,
              profile_id: profile.id,
              user: user.id,
            });
            providerProfile.save()
              .then((prof) => {
                ProviderProfile.findOne(prof)
                  .populate('user','email fname lname')
                  .then(prof => resolve({
                    user: prof.user,
                    token,
                  }));
              })
              .catch(reject);
          });
        }
      })
      .catch(reject);
  });
};

let providerProfile;

try {
  providerProfile = mongoose.model('ProviderProfileSchema');
} catch (err) {
  providerProfile = mongoose.model('ProviderProfileSchema', ProviderProfileSchema);
}
export default providerProfile;
