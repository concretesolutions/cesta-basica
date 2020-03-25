import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { processUser, processDonation, processSite } from './load-types'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()

      await processUser()
      await processDonation()
      await processSite()

      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
