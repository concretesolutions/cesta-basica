import { model, Schema } from 'mongoose'

const schema = new Schema({
  siteId: {
    type: Number,
    unique: true,
    trim: true,
    required: [true, 'siteId is required']
  },
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'name is required']
  },
  city: {
    type: String
  },
  state: {
    type: String
  }
})

export const Site = model('Sites', schema)
