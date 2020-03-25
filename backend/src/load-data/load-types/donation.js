import { connect, disconnect } from '../../core/database'
import { Donation } from '../../repositories'
import { config } from 'dotenv'
import { genericProcess } from '../genericProcess'

export async function process () {
  return genericProcess(Donation, 'donation-data.csv', row => {
    return {
      donationId: row.donationId,
      leaderLogin: row.leaderLogin,
      quantity: row.quantity,
      donor: row.donor,
      status: 'Esperando recebimento',
      s3Key: null
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
