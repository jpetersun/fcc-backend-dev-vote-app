import express from 'express'
const authRouter = express.Router()

import passportGithub from '../auth/github'

authRouter.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  req.session.returnTo = req.path
  res.redirect('/login')
}

authRouter.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

authRouter.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }))

authRouter.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(req.session.returnTo || '/')
    delete req.session.returnTo
  })

export { authRouter }
