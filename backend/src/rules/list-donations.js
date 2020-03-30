import { Donation } from '../repositories/donation'
import { statuses } from '../enums'

export async function listDonations ({ login, role }) {
  const donations = (
    await Donation.find({ leaderLogin: login })
  ).map(({
    donationId,
    login,
    quantity,
    donor,
    status,
    created,
    scheduled,
    received,
    lastDelivery,
    completed,
    strayed,
    point

  }) => ({
    donationId,
    leaderLogin: login,
    quantity,
    donor,
    status: status,
    statusText: statuses[status],
    created,
    scheduled: scheduled || new Date(),
    received,
    lastDelivery,
    completed,
    strayed,
    point
  }))

  return { donations }
}
