import mongoose from 'mongoose'

export const optionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  votes: Number,
  color: String
})
