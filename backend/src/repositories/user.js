import { model, Schema } from 'mongoose'
import { encrypt } from '../services'

const schema = new Schema({
  login: {
    type: String,
    unique: true,
    required: [true, 'login is required']
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  role: {
    type: String,
    enum: ['leader', 'admin', 'user'],
    required: [true, 'role is required']
  },
  email: {
    type: String,
    lowercase: true
  },
  cpf: {
    type: String,
    minLength: 11,
    maxLength: 11
  },
  rg: {
    type: String
  },
  phone: {
    type: String
  },
  birthdate: {
    type: Date
  },
  site: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  }
})

schema.pre('save', function (next) {
  this.password = encrypt(this.password)
  next()
})

export const User = model('User', schema)
