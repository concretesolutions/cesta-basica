import 'dotenv/config'
import { start } from './core/server'

(async function main () {
  console.log(new Date(), 'Initializing...')
  try {
    await start()
    console.log(new Date(), `Server up at port ${process.env.PORT}`)
  } catch (error) {
    console.error('Failed to start application', error)
  }
}())
