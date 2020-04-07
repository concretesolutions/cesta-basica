import filterUsers from './user/filter'
import filterDonation from './donation/filter'
import filterVoucher from './voucher/filter'

const filter = {
  user: filterUsers,
  donation: filterDonation,
  voucher: filterVoucher,
}

export function filterFile(data, type) {
  return filter[type] ? filter[type](data) : ''
}
