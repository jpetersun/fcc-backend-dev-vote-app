import mongoose from 'mongoose'
mongoose.Promise = global.Promise

import { optionSchema } from './option'

export const pollSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  options: [optionSchema],
  votersIpAddress: Array
})
