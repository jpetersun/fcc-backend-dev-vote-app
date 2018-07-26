import express from 'express'
const router = express.Router()
import { authRouter } from './index-auth'

import { User } from '../models/user'
import sanitizer from 'sanitizer'
import _ from 'lodash'
import randomColor from 'random-color'

router.get('/account-details', authRouter.ensureAuthenticated, (req, res) => {
  const theUser = User.findOne({ someID: req.user.someID })

  theUser.then((user) => {
    res.json(user)
  })
  .catch(err => {
    console.error('Mongoose Error', err)
  })
})

router.get('/polls', (req, res) => {
  const users = User.find({})

  users.then((user) => {
    res.send(user)
  })
  .catch(err => {
    console.error('Mongoose Error', err)
  })
})

router.get('/polls/:userId/:id', (req, res) => {
  const theUser = User.findOne({ _id: req.params.userId })

  theUser.then((user) => {
    const polls = user.polls
    const thePoll = polls.filter((item) => {
      return String(item._id) === req.params.id
    })
    res.send(thePoll)
  })
  .catch(err => {
    console.error('Mongoose Error', err)
  })
})


router.get('/create-poll', authRouter.ensureAuthenticated, (req, res, next) => {
  next()
})

router.get('/account', authRouter.ensureAuthenticated, (req, res, next) => {
  next()
})

router.post('/create-poll', authRouter.ensureAuthenticated, (req, res) => {
  let id

  if (req.body.user) {
    id = req.body.user._id
  } else {
    id = req.user._id
  }

  const theUser = User.findOne({_id: id})

  theUser.then((user) => {
    const options = req.body.values.map(value => {
      return {
        name: sanitizer.sanitize(value),
        votes: 0,
        color: randomColor(0.99, 0.99).hexString()
      }
    })

    const newPoll = {
      name: sanitizer.sanitize(req.body.name),
      options: options
    }

    user.polls.push(newPoll)

    user.save((err, user) => {
      if (err) return console.error(err)
      res.status(201).json(newPoll)
    })
  })
  .catch(err => {
    console.log('error:', err)
  })
})

router.put('/poll-results/:userId/:id', (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) console.error(err)

    const polls = user.polls
    const thePoll = polls.filter((item) => {
      return String(item._id) === req.params.id
    }).pop()

    const option = _.find(thePoll.options, {name: req.body.name})
    const poll = thePoll

    // TODO: limit voting
    option.votes += 1
    user.save()
    res.send(option)
  })
})

router.delete('/user-poll/:userId/:id', (req, res) => {
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
  .catch(err => {
    console.error('Mongoose Error', err)
  })
})

export { router }
