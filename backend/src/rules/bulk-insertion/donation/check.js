import { User, Site, Donation } from '../../../repositories'
import genericChecker from '../check-util'

import HttpException from '../../../core/http-exception'

const loginDonationMapFunc = (donation) => donation.leaderLogin
const loginUserMapFunc = (user) => user.login
const getDonationIds = (donation) => donation.donationId
const getSiteIdFunc = (site) => site.siteId

const checkDonationExists = async (validDonations) => {
  const toBeAddedDocs = validDonations.map(getDonationIds)

  const existingDonations = await Donation.find({ donationId: { $in: toBeAddedDocs } }, 'donationId')

  if (existingDonations.length > 0) {
    throw new HttpException(422, `Pacote(s) já existente(s) no sistema ${existingDonations.map(getDonationIds).join(', ')}`)
  }

  return validDonations
}

export default (validDonations) =>
  checkDonationExists(validDonations)
    .then((uniqueDonations) => genericChecker(uniqueDonations, loginDonationMapFunc, User, 'login', loginUserMapFunc, 'Usuário'))
    .then((checkSite) => genericChecker(checkSite, getSiteIdFunc, Site, 'siteId', getSiteIdFunc, 'Site'))
