import { Donation, User, Site, Voucher } from '../repositories'
import { statuses } from '../enums'
import config from '../../config'

export async function detailsDonation ({ donationId }) {
  if (!donationId) {
    throw new Error('A variável donationId deve ser preenchida')
  }

  const donation = await Donation.findOne({ donationId })

  if (!donation) {
    throw new Error(`Não existe nenhuma doação com o donationId ${donationId}`)
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
    throw new Error('Não foi possivel encontrar um líder associado à esta doação')
  }

  const site = await Site.findOne({ siteId }, { name: 1, city: 1, state: 1 })

  if (!site) {
    throw new Error('Não foi possível achar uma unidade associada à esta doação')
  }

  const publicPhotoUrl = receivedCardsS3Key ? `https://${config.app.bucketName}.s3.amazonaws.com/${receivedCardsS3Key}` : null

  const { name: leaderName } = leader

  const { name: siteName, city, state } = site

  const vouchers = (await Voucher.find({ donationId })).map(({
    voucherId,
    receivedCpf,
    receivedName,
    receivedContactNumber,
    receivedEmail,
    leaderComment,
    cardDonatedS3Key
  }) => {
    return {
      voucherId,
      receivedCpf,
      receivedName,
      receivedContactNumber,
      receivedEmail,
      leaderComment,
      publicPhotoUrl: cardDonatedS3Key ? `https://${config.app.bucketName}.s3.amazonaws.com/${cardDonatedS3Key}` : null
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
