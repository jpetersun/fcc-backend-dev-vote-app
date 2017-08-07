import passport from 'passport'
import { Strategy as TwitterStrategy } from 'passport-twitter'

import { User } from '../models/user'
import { config } from './config'
import init from './init'


passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  },

  (accessToken, refreshToken, profile, done) => {
    const searchQuery = {
      name: profile.displayName
    }

    const updates = {
      name: profile.displayName,
      someID: profile.id,
      avatar: profile._json.profile_image_url_https
    }

    const options = {
      upsert: true
    }

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
      if (err) {
        return done(err)
      } else {
        return done(null, user)
      }
    })
  }

))

// serialize user into the session
init()

export default passport
