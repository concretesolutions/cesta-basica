import { Site } from '../../../repositories'

export default async (validUsers) => {
  await Site.insertMany(validUsers)
  return { message: `${validUsers.length} site(s) inserido(s) com sucesso.` }
}
