import { connect, getConnectionState } from '../core/database'

export async function databaseConnector (req, res, next) {
  try {
    const { connected } = getConnectionState()

    if (connected) return next()

    await connect()

    return next()
  } catch (err) {
    console.log(new Date(), 'Database connection error', err)
    return res.status(500).json({ message: 'Internal' })
  }
}
