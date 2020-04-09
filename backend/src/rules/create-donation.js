import { Donation } from '../repositories'

export async function createDonation ({
  createdBy,
  leaderLogin,
  siteId,
  donationId,
  quantity,
  sentDate
}) {
  if (!leaderLogin) {
    throw new Error('leaderLogin is required')
  }

  if (!siteId) {
    throw new Error('siteId is required')
  }

  if (!donationId) {
    throw new Error('donationId is required')
  }

  if (!quantity) {
    throw new Error('quantity is required')
  }

  if (!sentDate) {
    throw new Error('sentDate is required')
  }

  const donation = await Donation.findOne({ donationId })

  if (donation) {
    throw new Error(`donationId ${donationId} is already registered`)
  }

  return Donation.create({
    donationId,
    leaderLogin,
    adminLogin: createdBy,
    siteId,
    quantity,
    status: 1,
    sentDate
  })
}
