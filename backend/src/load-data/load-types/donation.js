import { connect, disconnect } from '../../core/database'
import { Donation } from '../../repositories'
import { config } from 'dotenv'
import { genericProcess } from '../genericProcess'

export async function process () {
  return genericProcess(Donation, 'donation-data.csv', 'donationId', row => {
    return {
      donationId: row.donationId,
      leaderLogin: row.leaderLogin,
      siteId: row.siteId,
      quantity: row.quantity,
      receivedQuantity: null,
      donor: null,
      status: 1,
      receivedCardsS3Key: null,
      created: null,
      scheduled: row.scheduled,
      sentDate: null,
      received: null,
      lastDelivery: null,
      completed: null,
      strayed: null,
      point: null
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
