import { User, Donation } from '../../../repositories'
import genericChecker from '../check-util'

const loginDonationMapFunc = (donation) => donation.leaderLogin
const loginUserMapFunc = (user) => user.login
const getDonationIds = (voucherOrDonation) => voucherOrDonation.donationId

export default (validDonations) =>
  genericChecker(validDonations, loginDonationMapFunc, User, 'login', loginUserMapFunc, 'Usuário')
    .then((checkDonation) => genericChecker(checkDonation, getDonationIds, Donation, 'donationId', getDonationIds, 'Pacote'))
