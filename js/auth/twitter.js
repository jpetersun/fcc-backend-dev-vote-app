import passport from 'passport'
const TwitterStrategy = require('passport-twitter').Strategy

const User = require('../models/user')
import { config } from './config'
const init = require('./init')

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  },

  function(accessToken, refreshToken, profile, done) {
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
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
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

module.exports = passport
