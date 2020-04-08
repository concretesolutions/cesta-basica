import mongoose from 'mongoose'

mongoose.set('useCreateIndex', true)
mongoose.set('debug', process.env.MONGOOSE_DEBUG === 'true')

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
  return mongoose.connect(process.env.DBURL, { autoReconnect: true })
}

export const disconnect = () => {
  console.log(new Date(), 'Database disconnect')
  return mongoose.disconnect(process.env.DBURL)
}
