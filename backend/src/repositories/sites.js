import { model, Schema } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    unique: true,
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
