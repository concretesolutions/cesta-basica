import { model, Schema } from 'mongoose'

const schema = new Schema({
  login: {
    type: String,
    unique: true,
    required: [true, 'login is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  name: {
    type: String
  },
  role: {
    type: String,
    enum: ['leader', 'admin'],
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
  siteId: {
    type: Number,
    trim: true
  },
  deliveryLocation: {
    type: String
  },
  deliveryCep: {
    type: String
  },
  slums: {
    type: String
  },
  userType: {
    type: String
  }
})

export const User = model('User', schema)
