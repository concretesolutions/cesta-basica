import 'dotenv/config'
import { start } from './core/server'
import { connect } from './core/database'

(async function main () {
  console.log(new Date(), 'Initializing...')
  try {
    await connect()
    await start()
    console.log(new Date(), `Server up at port ${process.env.PORT}`)
  } catch (error) {
    console.error('Failed to start application', error)
  }
}())
