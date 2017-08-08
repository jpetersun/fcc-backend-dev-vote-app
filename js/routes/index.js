import express from 'express'
const router = express.Router()
import { authRouter } from './index-auth'

import ip from 'ip'
import { User } from '../models/user'
const sanitizer = require('sanitizer')
const _ = require('lodash')

router.get('/account-details', authRouter.ensureAuthenticated, function (req, res) {
  const theUser = User.findOne({ someID: req.user.someID })
  theUser.then((user) => {
    res.json(user)
  })
})

// console.log(allPolls.then)
router.get('/polls', (req, res) => {
  const users = User.find({})
  users.then((user) => {
    res.send(user)
  })
})

router.get('/polls/:userId/:id', (req, res) => {
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


router.get('/create-poll', authRouter.ensureAuthenticated, (req, res, next) => {
  next()
})

router.get('/account', authRouter.ensureAuthenticated, (req, res, next) => {
  next()
})

router.post('/create-poll', authRouter.ensureAuthenticated, (req, res) => {
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

router.put('/poll-results/:userId/:id', (req, res) => {
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
})

export { router }
