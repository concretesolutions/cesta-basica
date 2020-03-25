import { User } from '../repositories'

export async function createUser ({ login, password, email, role = 'leader' }) {
  const user = await User.create({
    login,
    password,
    email,
    role
  })

  return {
    id: user.id,
    login,
    role: user.role
  }
}
