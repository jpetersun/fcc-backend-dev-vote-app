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
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/vote-app')
const pollSchema = mongoose.Schema({
  name: String,
  options: Array
})
const Poll = mongoose.model('Poll', pollSchema)

const optionsSchema = mongoose.Schema({

})

// console.log(allPolls.then)
app.get('/polls', (req, res) => {
  const polls = Poll.find({})
  polls.then((poll) => {
    res.send(poll)
  })
})
app.post('/poll-results', (req, res) => {
  let poll = new Poll({ name: req.body.selectpicker, options: []})
  poll.save((err, poll) => {
    if (err) return console.error(err)
  })
  console.log(req.body)
  res.send('hi')
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
