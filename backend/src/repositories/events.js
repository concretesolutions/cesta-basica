import { model, Schema } from 'mongoose'

const schema = new Schema({
  login: {
    type: String,
    required: [true, 'login is required']
  },
  role: {
    type: String,
    required: [true, 'role is required']
  },
  timestamp: {
    type: Date
  },
  type: {
    type: String,
    lowercase: true,
    enum: ['commitment', 'checklist'],
    required: [true, 'type is required']
  }
})

schema.pre('save', function (next) {
  this.timestamp = new Date()
  next()
})

export const Events = model('Events', schema)
