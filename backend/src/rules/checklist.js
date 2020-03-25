import { Events } from '../repositories/events'

export async function checklist ({ login, role }) {
  return Events.create({
    login,
    role,
    type: 'checklist'
  })
}
