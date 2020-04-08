import { User, Site } from '../../../repositories'
import genericChecker from '../check-util'
import HttpException from '../../../core/http-exception'

const loginMapFunc = (user) => user.login
const getSiteIdFunc = (site) => site.siteId

const checkUser = async (validUsers) => {
  const toBeAddedDocs = validUsers.map(loginMapFunc)

  const existingUsers = await User.find({ login: { $in: toBeAddedDocs } }, 'login')

  if (existingUsers.length > 0) {
    throw new HttpException(422, `Usuário(s) já existente(s) no sistema ${existingUsers.map(loginMapFunc).join(', ')}`)
  }

  return validUsers
}

export default (validUsers) =>
  checkUser(validUsers)
    .then((checkSite) => genericChecker(checkSite, getSiteIdFunc, Site, 'siteId', getSiteIdFunc, 'Site'))
