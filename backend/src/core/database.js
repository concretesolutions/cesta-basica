import mongoose from 'mongoose'
import config from '../../config'

mongoose.set('useCreateIndex', true)
mongoose.set('debug', config.db.mongooseDebug === 'true')

const connectionStates = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconecting'
}

export const getConnectionState = () =>
  connectionStates[mongoose.connection.readyState] || connectionStates[0]

export const isConnected = () =>
  mongoose.connection.readyState === 1

export const connect = () => {
  console.log(new Date(), 'Database connected')
  return mongoose.connect(config.db.url, { autoReconnect: true })
}

export const disconnect = () => {
  console.log(new Date(), 'Database disconnect')
  return mongoose.disconnect(config.db.url)
}
