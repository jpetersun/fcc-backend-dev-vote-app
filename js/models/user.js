import mongoose from 'mongoose'
mongoose.Promise = global.Promise

import { pollSchema } from './poll'

const userSchema = new mongoose.Schema({
  name: String,
  someID: String,
  avatar: String,
  polls: [pollSchema]
},{usePushEach: true})

export const User = mongoose.model('User', userSchema)
