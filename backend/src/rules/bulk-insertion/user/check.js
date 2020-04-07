import { User } from '../../../repositories'
import HttpException from '../../../core/http-exception'

const loginMapFunc = (user) => user.login;

export default async (validUsers) => {
  const toBeAddedDocs = validUsers.map(loginMapFunc);

  const existingUsers = await User.find({ login: { $in: toBeAddedDocs } }, 'login');

  if (existingUsers.length > 0) {
    throw new HttpException(422, `Usuário(s) já existente(s) no sistema ${existingUsers.map(loginMapFunc).join(', ')}`)
  }

  return validUsers;
}
