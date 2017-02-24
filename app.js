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

const app = express()

app.use('/public', express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/vote-app')
const optionSchema = mongoose.Schema({
  name: String,
  votes: Number
})
const pollSchema = mongoose.Schema({
  name: String,
  options: [optionSchema]
})
const Poll = mongoose.model('Poll', pollSchema)
const Option = mongoose.model('Option', optionSchema)


// console.log(allPolls.then)
app.get('/polls', (req, res) => {
  const polls = Poll.find({})
  polls.then((poll) => {
    res.send(poll)
  })
})

app.get('/polls/:id', (req, res) => {
  const thePoll = Poll.findOne({ _id: req.params.id })
  thePoll.then((poll) => {
    res.send(poll)
  })
})

app.post('/poll-results/:id', (req, res) => {
  // console.log(req.params.id)
  console.log(req.body)
  Poll.findById(req.params.id, (err, poll) => {
    if (err) console.error(err)
    const option = poll.options.id(req.body._id)
    option.votes += 1

    poll.save()
    res.send(option)
  })
})

app.post('/create-poll', (req, res) => {
  let poll = new Poll({
    name: req.body.poll.name,
    options: [
      // new Option({
      //   name:req.body.poll.option1,
      //   votes: 0
      // }),
      // new Option({
      //   name:req.body.poll.option2,
      //   votes: 0
      // })
      {
        name: req.body.poll.option1,
        votes: 0
      },
      {
        name: req.body.poll.option2,
        votes: 0
      }
    ]
  })
  poll.save((err, poll) => {
    if (err) return console.error(err)
  })
  console.log(req.body)
  res.redirect('/')
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
