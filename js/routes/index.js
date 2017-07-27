const express = require('express')
const router = express.Router()

// const passportLinkedIn = require('../auth/linkedin')
const passportGithub = require('../auth/github')
const passportTwitter = require('../auth/twitter')
const passportGoogle = require('../auth/google')

router.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.returnTo = req.path
  res.redirect('/login')
}

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' })
// })

// router.get('/login', function(req, res, next) {
//   res.send('Go back and register!')
// })

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})

// router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin'))

// router.get('/auth/linkedin/callback',
//   passportLinkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication
//     res.json(req.user)
//   })

router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }))

router.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/')
    delete req.session.returnTo
  })

router.get('/auth/twitter', passportTwitter.authenticate('twitter'))

router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/')
    delete req.session.returnTo
  })

router.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile'] }))

router.get('/auth/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/')
    delete req.session.returnTo
  })

module.exports = router
