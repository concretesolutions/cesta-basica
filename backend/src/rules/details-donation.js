import { Donation, User, Site, Voucher } from '../repositories'
import { statuses } from '../enums'

export async function detailsDonation ({ donationId }) {
  if (!donationId) {
    throw new Error('donationId is required')
  }

  const donation = await Donation.findOne({ donationId })

  if (!donation) {
    throw new Error(`Does not exists donation with donationId ${donationId}`)
  }

  const {
    leaderLogin,
    siteId,
    quantity,
    receivedQuantity,
    donor,
    status,
    receivedCardsS3Key,
    created,
    scheduled,
    sentDate,
    received,
    lastDelivery,
    completed,
    strayed,
    point
  } = donation

  const leader = await User.findOne({ login: leaderLogin }, { name: 1 })

  if (!leader) {
    throw new Error('Could not find the leader associate with this donation')
  }

  const site = await Site.findOne({ siteId }, { name: 1, city: 1, state: 1 })

  if (!site) {
    throw new Error('Could not find the site associate with this donation')
  }

  const publicPhotoUrl = receivedCardsS3Key ? `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${receivedCardsS3Key}` : null

  const { name: leaderName } = leader

  const { name: siteName, city, state } = site

  const vouchers = (await Voucher.find({ donationId })).map(({
    receivedCpf,
    receivedName,
    receivedContactNumber,
    leaderComment,
    cardDonatedS3Key
  }) => {
    return {
      receivedCpf,
      receivedName,
      receivedContactNumber,
      leaderComment,
      publicPhotoUrl: cardDonatedS3Key ? `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${cardDonatedS3Key}` : null
    }
  })

  return {
    donationId,
    leaderLogin,
    leaderName,
    siteId,
    siteName,
    city,
    state,
    quantity,
    receivedQuantity,
    donor,
    status,
    statusText: statuses[status],
    publicPhotoUrl,
    created,
    scheduled,
    sentDate,
    received,
    lastDelivery,
    completed,
    strayed,
    point,
    vouchers
  }
}
