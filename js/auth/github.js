import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'

import { User } from '../models/user'
import { config } from './config'
const init = require('./init')

passport.use(new GitHubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    // process.nextTick(function () {

    // To keep the example simple, the user's GitHub profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the GitHub account with a user record in your database,
    // and return that user instead.

    const searchQuery = {
      name: profile.displayName
    }

    const updates = {
      name: profile.displayName,
      someID: profile.id,
      avatar: profile._json.avatar_url
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

module.exports = passport
