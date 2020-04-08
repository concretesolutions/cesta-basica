import { User } from '../repositories'

export async function listLeaders (name = '') {
  if (!name) {
    throw new Error('The name is required')
  }

  if (name.toString().length < 3) {
    throw new Error('The name must have at least 3 chars')
  }

  return (await User.find({
    role: 'leader',
    name: new RegExp(`^${name}`)
  })).map(({ name, login }) => ({ name, login }))
}
