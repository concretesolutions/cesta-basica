import { User, Donation, Voucher } from '../../../repositories'
import genericChecker from '../check-util';
import CustomError from '../../../core/custom-error'

const getUserLoginFunc = (user) => user.login;

const getLeaderIdFunc = (voucherOrUser) => voucherOrUser.leaderLogin;
const getDonationIds = (voucherOrDonation) => voucherOrDonation.donationId;
const getVoucherIdFunc = (voucher) => voucher.voucherId;

const checkVouchersExists = async (validDonations) => {
  const toBeAddedDocs = validDonations.map(getVoucherIdFunc);

  const existingDonations = await Voucher.find({ voucherId: { $in: toBeAddedDocs } }, 'voucherId');

  if (existingDonations.length > 0) {
    throw new CustomError(422, `Vouchers(s) já existente(s) no sistema ${existingDonations.map(getVoucherIdFunc).join(', ')}`)
  }

  return validDonations;
};

export default (validVouchers) =>
  checkVouchersExists(validVouchers)
    .then((checkUser) => genericChecker(checkUser, getLeaderIdFunc, User, 'login', getUserLoginFunc, 'Usuário'))
    .then((checkDonation) => genericChecker(checkDonation, getDonationIds, Donation, 'donationId', getDonationIds, 'Pacote'));
