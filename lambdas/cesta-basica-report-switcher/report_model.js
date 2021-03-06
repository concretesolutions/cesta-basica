const { models, model, Schema } = require('mongoose')

const schema = new Schema({
  status: {
    type: Number,
    enum: [1, 2, 3], // 1 processando 2 processado 3 erro
    required: true
  },
  timestamp: {
    type: Date
  },
  details: String,
  owner: String,
  url: String
})

schema.pre('save', function (next) {
  this.timestamp = new Date()
  next()
})

module.exports = models.Report || model('Report', schema)