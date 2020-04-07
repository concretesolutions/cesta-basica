import { User } from '../../../repositories'

export default async (validUsers) => {
  await User.insertMany(validUsers);
  return { message: `${validUsers.length} usuário(s) inserido(s) com sucesso.` }
}
