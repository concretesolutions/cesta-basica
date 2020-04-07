import checkUsers from './user/check'
import checkDonation from './donation/check'
import checkVoucher from './voucher/check'

const check = {
  user: checkUsers,
  donation: checkDonation,
  voucher: checkVoucher,
}

export function checkFile(data, type) {
  return check[type] ? check[type](data) : ''
}
