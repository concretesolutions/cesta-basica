import processUsers from './user/process';
import processDonation from './donation/process';
import processVoucher from './voucher/process';

export async function processFile(data, type) {
  if (type === 'user') {
    return processUsers(data);
  }
  if (type === 'donation') {
    return processDonation(data);
  }
  if (type === 'voucher') {
    return processVoucher(data);
  }
  return '';
}
