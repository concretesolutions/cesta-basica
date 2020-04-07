import mongoose from 'mongoose'

mongoose.set('useCreateIndex', true)
mongoose.set('debug', process.env.MONGOOSE_DEBUG === 'true')

const status = {
  connected: false
}

export const getConnectionState = () => ({ ...status })

export const connect = () => {
  console.log(new Date(), 'Database connected')
  return mongoose.connect(process.env.DBURL)
}

export const disconnect = () => {
  console.log(new Date(), 'Database disconnect')
  return mongoose.disconnect(process.env.DBURL)
}

mongoose.connection.on('connected', () => {
  status.connected = true
})

mongoose.connection.on('disconnected', () => {
  status.connected = false
})
