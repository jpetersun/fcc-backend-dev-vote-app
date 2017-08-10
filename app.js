import 'babel-register'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ReactRouter, match, RouterContext } from 'react-router'
import _ from 'lodash'
import fs from 'fs'
const baseTemplate = fs.readFileSync('./index.html')
const template = _.template(baseTemplate)
import ClientApp from './js/ClientApp.jsx'
const Routes = ClientApp.Routes
import bodyParser from 'body-parser'
import morgan from 'morgan'
import session from 'express-session'
import passport from 'passport'
import mongoose from 'mongoose'
import { router } from './js/routes/index'
import { authRouter } from './js/routes/index-auth'
const app = express()

app.use('/public', express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

app.use([router, authRouter])

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

const port = process.env.PORT || 3001
console.log('listening on portorino ' + port)
app.listen(port)

export { app }
