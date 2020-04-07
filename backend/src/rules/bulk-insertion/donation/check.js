import { User, Donation } from '../../../repositories'
import genericChecker from '../check-util';

import CustomError from '../../../core/custom-error'

const loginDonationMapFunc = (donation) => donation.leaderLogin;
const loginUserMapFunc = (user) => user.login;
const getDonationIds = (donation) => donation.donationId;

const checkDonationExists = async (validDonations) => {
  const toBeAddedDocs = validDonations.map(getDonationIds);

  const existingDonations = await Donation.find({ donationId: { $in: toBeAddedDocs } }, 'donationId');

  if (existingDonations.length > 0) {
    throw new CustomError(422, `Pacotes(s) já existente(s) no sistema ${existingDonations.map(getDonationIds).join(', ')}`)
  }

  return validDonations;
}

export default (validDonations) =>
  checkDonationExists(validDonations)
    .then((uniqueDonations) => genericChecker(uniqueDonations, loginDonationMapFunc, User, 'login', loginUserMapFunc, 'Usuário'));
