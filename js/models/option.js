const mongoose = require('mongoose')

const optionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  votes: Number,
  color: String
})

module.exports = optionSchema
