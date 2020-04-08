import processUsers from './user/process'
import processDonation from './donation/process'
import processVoucher from './voucher/process'
import processSite from './site/process'
import processTransfer from './transfer/process'

const process = {
  user: processUsers,
  donation: processDonation,
  voucher: processVoucher,
  site: processSite,
  transfer: processTransfer
}

export function processFile (data, type) {
  return process[type] ? process[type](data) : ''
}
