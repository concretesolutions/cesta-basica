import processUsers from './user/process'
import processDonation from './donation/process'
import processVoucher from './voucher/process'

const process = {
  user: processUsers,
  donation: processDonation,
  voucher: processVoucher,
}

export function processFile(data, type) {
  return process[type] ? process[type](data) : ''
}
