import { Events } from '../repositories/events'

export async function commitment ({ login, role }) {
  return Events.create({
    login,
    role,
    type: 'commitment'
  })
}
