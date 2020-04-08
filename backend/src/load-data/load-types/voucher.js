import { connect, disconnect } from '../../core/database'
import { Voucher } from '../../repositories'
import { config } from 'dotenv'
import { genericProcess } from '../genericProcess'

export async function process () {
  return genericProcess(Voucher, 'voucher-data.csv', 'voucherId', row => {
    const timestamp = new Date()

    return {
      voucherId: row.voucherId,
      donationId: row.donationId,
      leaderLogin: row.leaderLogin,
      leaderComment: null,
      status: 1,
      created: timestamp,
      delivered: null,
      receivedCpf: null,
      receivedName: null,
      receivedContactNumber: null,
      cardDonatedS3Key: null,
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
