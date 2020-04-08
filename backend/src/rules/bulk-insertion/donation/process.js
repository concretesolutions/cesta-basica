import { Donation } from '../../../repositories'

export default async (validDonations) => {
  await Donation.insertMany(validDonations)
  return { message: `${validDonations.length} pacote(s) inserido(s) com sucesso.` }
}
