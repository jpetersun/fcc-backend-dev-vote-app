require('babel-register')

const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ReactRouter = require('react-router')
const match = ReactRouter.match
const RouterContext = ReactRouter.RouterContext
const _ = require('lodash')
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

const GITHUB_CLIENT_ID = "5f05c2d5f34d08bed5b8";
const GITHUB_CLIENT_SECRET = "080c7113b4430bfb74a781232d8f144a67acc837";
const mongoose = require('mongoose')
const ip = require('ip')

const optionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  votes: Number,
  color: String
})
const pollSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  options: [optionSchema],
  votersIpAddress: Array
})
const Poll = mongoose.model('Poll', pollSchema)
const Option = mongoose.model('Option', optionSchema)

// user
const userSchema = new mongoose.Schema({
  name: String,
  someID: String,
  avatar: String,
  polls: [pollSchema],
})
const User = mongoose.model('User', userSchema);


passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    // process.nextTick(function () {

      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
    var searchQuery = {
      name: profile.displayName
    };

    var updates = {
      name: profile.displayName,
      someID: profile.id,
      avatar: profile._json.avatar_url
    };

    var options = {
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
    //   return done(null, profile);
    // });
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
    res.send(user)
  })
});

// app.get('/login', function(req, res){
//   console.log(req.user)
//   res.render('login', { user: req.user });
// });

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

// mongoose.connect('mongodb://localhost:27017/vote-app')
mongoose.connect('mongodb://jpeterson:something123@ds151450.mlab.com:51450/fcc-vote-app')

app.delete('/user-poll/:userId/:id', (req, res) => {
  const theUser = User.findOne({ _id: req.params.userId })
  theUser.then((user) => {
    const polls = user.polls
    const filteredPolls = polls.filter((item) => {
      return String(item._id) !== req.params.id
    })
    user.polls = filteredPolls
    user.save()
    res.end()
  })
})

// console.log(allPolls.then)
app.get('/polls', (req, res) => {
  const users = User.find({})
  users.then((user) => {
    res.send(user)
  })
  // const polls = Poll.find({})
  // polls.then((poll) => {
  //   res.send(poll)
  // })
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

app.post('/poll-results/:userId/:id', (req, res) => {
  // console.log(req.params.id)
  // console.log(req.body)
  User.findById(req.params.userId, (err, user) => {
    if (err) console.error(err)
    const polls = user.polls
    const thePoll = polls.filter((item) => {
      return String(item._id) === req.params.id
    })
    // console.log(thePoll)
    const option = thePoll[0].options.id(req.body._id)
    const poll = thePoll[0]
    if (poll.votersIpAddress.indexOf(ip.address()) >= 0) {
      res.send('You already voted')
    } else {
      poll.votersIpAddress.push(ip.address())
      option.votes += 1
      user.save()
      res.send(option)
    }
  })
  // Poll.findById(req.params.id, (err, poll) => {
  //   if (err) console.error(err)
  //   const option = poll.options.id(req.body._id)
  //   option.votes += 1

  //   poll.save()
  //   res.send(option)
  // })
})

app.get('/create-poll', ensureAuthenticated, (req, res, next) => {
  next()
})

app.get('/account', ensureAuthenticated, (req, res, next) => {
  next()
})

app.post('/create-poll', ensureAuthenticated, (req, res) => {
  // console.log(req.body)
  const theUser = User.findOne({ _id: req.user._id })
  theUser.then((user) => {
    const options = []
    req.body.values.forEach((value) => {
      options.push({
        name: value,
        votes: 0,
        color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
      })
    })
    user.polls.push({
      name: req.body.name,
      options: options
    })
    user.save((err, user) => {
      if (err) return console.error(err)
    })
  })
  res.redirect('/')

  // let poll = new Poll({
  //   name: req.body.poll.name,
  //   options: [
  //     {
  //       name: req.body.poll.option1,
  //       votes: 0
  //     },
  //     {
  //       name: req.body.poll.option2,
  //       votes: 0
  //     }
  //   ]
  // })
  // poll.save((err, poll) => {
  //   if (err) return console.error(err)
  // })
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


// app.post('/#/details/:id', (req, res) => {
//   console.log('saved!')
// })

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function() {
//   console.log('we are in biz')
// })

console.log('listening on portorino ' + port)
app.listen(port)
