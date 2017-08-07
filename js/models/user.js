const mongoose = require('mongoose')
const pollSchema = require('./poll')

const userSchema = new mongoose.Schema({
  name: String,
  someID: String,
  avatar: String,
  polls: [pollSchema]
})

export const User = mongoose.model('User', userSchema)
