import 'dotenv/config'
import { start } from './core/server'
import { connect } from './core/database'
import config from '../config'

(async function main () {
  console.log(new Date(), 'Initializing...')
  try {
    await connect()
    await start()
    console.log(new Date(), `Server up at port ${config.app.port}`)
  } catch (error) {
    console.error('Failed to start application', error)
  }
}())
