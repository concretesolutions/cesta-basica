import checkUsers from './user/check';
import checkDonation from './donation/check';
import checkVoucher from './voucher/check';

export function checkFile(data, type) {
  if (type === 'user') {
    return checkUsers(data);
  }
  if (type === 'donation') {
    return checkDonation(data);
  }
  if (type === 'voucher') {
    return checkVoucher(data);
  }

  return '';
}
