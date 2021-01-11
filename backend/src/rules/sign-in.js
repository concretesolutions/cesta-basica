import jwt from 'jsonwebtoken'
import { encrypt } from '../services'
import { User } from '../repositories'
import config from '../../config'

export async function signin ({ login, password }) {
  const user = await User.findOne({ login, password: encrypt(password) })

  if (user) {
    const { _id: id, login, role, email, name } = user
    const token = jwt.sign({ id, login, role }, config.app.secret)

    return {
      user: { id, login, role, email, name },
      token
    }
  }

  return Promise.reject(new Error('Login have failed'))
}
