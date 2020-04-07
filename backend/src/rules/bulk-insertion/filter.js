import filterUsers from './user/filter';
import filterDonation from './donation/filter';
import filterVoucher from './voucher/filter';

export async function filterFile(data, type) {
  if (type === 'user') {
    return filterUsers(data);
  }
  if (type === 'donation') {
    return filterDonation(data);
  }
  if (type === 'voucher') {
    return filterVoucher(data);
  }
  return '';
}
