import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import { User } from '../models/user'
import { config } from './config'
import init from './init'


passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    // process.nextTick(function () {

    const searchQuery = {
      name: profile.displayName
    }

    const updates = {
      name: profile.displayName,
      someID: profile.id,
      avatar: profile._json.image.url
    }

    const options = {
      upsert: true
    }

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
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
