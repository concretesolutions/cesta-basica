import checkUsers from './user/check'
import checkDonation from './donation/check'
import checkVoucher from './voucher/check'
import checkSite from './site/check'
import checkTransfer from './transfer/check'

const check = {
  user: checkUsers,
  donation: checkDonation,
  voucher: checkVoucher,
  site: checkSite,
  transfer: checkTransfer
}

export function checkFile (data, type) {
  return check[type] ? check[type](data) : ''
}
