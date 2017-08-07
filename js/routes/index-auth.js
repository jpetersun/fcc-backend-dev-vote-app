const express = require('express')
const authRouter = express.Router()

import passportGithub from '../auth/github'
import passportTwitter from '../auth/twitter'
import passportGoogle from '../auth/google'

authRouter.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next() }
  req.session.returnTo = req.path
  res.redirect('/login')
}

authRouter.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

authRouter.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }))

authRouter.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect(req.session.returnTo || '/')
    delete req.session.returnTo
  })

authRouter.get('/auth/twitter', passportTwitter.authenticate('twitter'))

authRouter.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect(req.session.returnTo || '/')
    delete req.session.returnTo
  })

authRouter.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile'] }))

authRouter.get('/auth/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect(req.session.returnTo || '/')
    delete req.session.returnTo
  })

module.exports = authRouter
