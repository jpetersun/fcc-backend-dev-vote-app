const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-strategy').Strategy

// const users = require('./models/users')


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
// app.use(express.static('public'))

// const Account = require('./models/account')
// passport.use(new LocalStrategy(Account.authenticate()))
// passport.serializeUser(Account.serializeUser())
// passport.deserializeUser(Account.deserializeUser())

mongoose.connect('mongodb://localhost:27017/voteapp')

// Check if we are connected :D

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('we are in biz')
// });

// Catch daat 404, and next dat
app.use((req, res, next) => {
  const err = new Error('Not Found, lmao')
  err.status = 404
  next(err)
})

// Dev error handlerino, print dat stacktrace bruh
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handlerino, also print dat stacktracirino
app.use((err, req, re, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
