import { connect, disconnect } from '../../core/database'
import { Site } from '../../repositories'
import { config } from 'dotenv'
import { genericProcess } from '../genericProcess'

export async function process () {
  return genericProcess(Site, 'site-data.csv', 'name', row => {
    return {
      siteId: row.siteId,
      name: row.name,
      city: row.city,
      state: row.state
    }
  })
}

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()
      await process()
      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
