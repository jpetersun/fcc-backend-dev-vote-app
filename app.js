require('babel-register')

const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ReactRouter = require('react-router')
const match = ReactRouter.match
const RouterContext = ReactRouter.RouterContext
import _ from 'lodash'
const fs = require('fs')
const port = 3000
const baseTemplate = fs.readFileSync('./index.html')
const template = _.template(baseTemplate)
const ClientApp = require('./js/ClientApp.jsx')
const Routes = ClientApp.Routes
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy

const mongoose = require('mongoose')
const ip = require('ip')
const User = require('./js/models/user')

// console.log(process.env.CALLBACK_DEV)
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID_DEV || process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET_DEV || process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_DEV || "https://vote-on-it.now.sh/auth/github/callback"
    // callbackURL: "http://127.0.0.1:3000/auth/github/callback"
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
    };

    const updates = {
      name: profile.displayName,
      someID: profile.id,
      avatar: profile._json.avatar_url
    };

    const options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
const app = express()

app.use('/public', express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/account-details', ensureAuthenticated, function(req, res) {
  const theUser = User.findOne({ someID: req.user.someID })
  theUser.then((user) => {
    res.json(user)
  })
});


app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // console.log(req.user)
    res.redirect(req.session.returnTo || '/')
    delete req.session.returnTo
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.returnTo = req.path
  res.redirect('/login')
}

mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/vote-app')
// console.log(process.env.DATABASE)

app.delete('/user-poll/:userId/:id', (req, res) => {
  const theUser = User.findOne({ _id: req.params.userId })
  theUser.then((user) => {
    const polls = user.polls
    const filteredPolls = polls.filter((item) => {
      return String(item._id) !== req.params.id
    })
    user.polls = filteredPolls
    user.save()
    res.json(user.polls)
  })
})

// console.log(allPolls.then)
app.get('/polls', (req, res) => {
  const users = User.find({})
  users.then((user) => {
    res.send(user)
  })
})

app.get('/polls/:userId/:id', (req, res) => {
  const theUser = User.findOne({ _id: req.params.userId })
  theUser.then((user) => {
    const polls = user.polls
    const thePoll = polls.filter((item) => {
      return String(item._id) === req.params.id
    })
    // console.log(thePoll)
    res.send(thePoll)
  })
})

app.put('/poll-results/:userId/:id', (req, res) => {
  // console.log(req.params.id)
  // console.log(req.body)

  User.findById(req.params.userId, (err, user) => {
    if (err) console.error(err)
    const polls = user.polls
    const thePoll = polls.filter((item) => {
      return String(item._id) === req.params.id
    }).pop()
    // console.log(thePoll[0].options)
    // const option = thePoll[0].options.id(req.body._id)
    const option = _.find(thePoll.options, {name: req.body.name})
    const poll = thePoll
    if (poll.votersIpAddress.indexOf(ip.address()) >= 0) {
      res.send('You already voted')
    } else {
      poll.votersIpAddress.push(ip.address())
      option.votes += 1
      user.save()
      res.send(option)
    }
  })
})

app.get('/create-poll', ensureAuthenticated, (req, res, next) => {
  next()
})

app.get('/account', ensureAuthenticated, (req, res, next) => {
  next()
})

app.post('/create-poll', ensureAuthenticated, (req, res) => {
  // console.log(req.body)
  // console.log(req.body.user._id)
  let id
  if (req.body.user) {
    id = req.body.user._id
  } else {
    id = req.user._id
  }

  const theUser = User.findOne({ _id: id})
  theUser.then((user) => {
    const options = []
    req.body.values.forEach((value) => {
      options.push({
        name: value,
        votes: 0,
        color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
      })
    })
    const newPoll = {
      name: req.body.name,
      options: options
    }
    user.polls.push(newPoll)
    user.save((err, user) => {
      if (err) return console.error(err)
    })
    res.json(newPoll)
  })
  // res.redirect('/')
  // res.json(newPoll)
})

app.use((req, res) => {
  match({ routes: Routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
    const body = ReactDOMServer.renderToString(
      React.createElement(RouterContext, renderProps))
    res.status(200).send(template({ body }))
    } else {
      res.status(404).send('Not found')
    }
  })
})

console.log('listening on portorino ' + port)
app.listen(port)

module.exports = app
