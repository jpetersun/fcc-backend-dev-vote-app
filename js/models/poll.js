const mongoose = require('mongoose')
const optionSchema = require('./option')

const pollSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  options: [optionSchema],
  votersIpAddress: Array
})

module.exports = pollSchema
