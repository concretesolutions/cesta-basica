import { Voucher } from '../../../repositories'

export default async (validVouchers) => {
  await Voucher.insertMany(validVouchers)
  return { message: `${validVouchers.length} voucher(s) inserido(s) com sucesso.` }
}
