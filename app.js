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

const mongoose = require('mongoose')
const router = require('./js/routes/index')
const authRouter = require('./js/routes/index-auth')
const app = express()

app.use('/public', express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', [router, authRouter])

// console.log(process.env.DATABASE)
mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/vote-app')

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
