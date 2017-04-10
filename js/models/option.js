const mongoose = require('mongoose')

const optionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  votes: Number,
  color: String
})

const Option = mongoose.model('Option', optionSchema)

module.exports = optionSchema
