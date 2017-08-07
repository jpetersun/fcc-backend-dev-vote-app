import mongoose from 'mongoose'
import { optionSchema } from './option'

export const pollSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  options: [optionSchema],
  votersIpAddress: Array
})
