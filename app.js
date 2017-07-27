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
const sanitizer = require('sanitizer')

const mongoose = require('mongoose')
const ip = require('ip')
const User = require('./js/models/user')
const routes = require('./js/routes/index')

const app = express()

app.use('/public', express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)

app.get('/account-details', routes.ensureAuthenticated, function (req, res) {
  const theUser = User.findOne({ someID: req.user.someID })
  theUser.then((user) => {
    res.json(user)
  })
})

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

app.get('/create-poll', routes.ensureAuthenticated, (req, res, next) => {
  next()
})

app.get('/account', routes.ensureAuthenticated, (req, res, next) => {
  next()
})

app.post('/create-poll', routes.ensureAuthenticated, (req, res) => {
  // console.log(req.body)
  // console.log(req.body.user._id)
  let id
  if (req.body.user) {
    id = req.body.user._id
  } else {
    id = req.user._id
  }

  const theUser = User.findOne({_id: id})
  theUser.then((user) => {
    const options = []

    // Sanitize user input
    req.body.values = req.body.values.map(value => {
      return sanitizer.sanitize(value)
    })

    req.body.values.forEach((value) => {
      options.push({
        name: value,
        votes: 0,
        color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
      })
    })

    const newPoll = {
      name: sanitizer.sanitize(req.body.name),
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
  match({routes: Routes, location: req.url}, (error, redirectLocation, renderProps) => {
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
