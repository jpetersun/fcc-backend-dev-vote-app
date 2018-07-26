import mongoose from 'mongoose'
mongoose.Promise = global.Promise

export const optionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  votes: Number,
  color: String
})
