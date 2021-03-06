import { User } from '../repositories'
import { validateLogin, encrypt } from '../services'

export async function createUser ({ login, password, email, role = 'leader' }) {
  const loginValidated = await validateLogin(login)
  if (!loginValidated) throw new Error('A variável login não é um número de cpf válido')

  password = encrypt(password)

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
