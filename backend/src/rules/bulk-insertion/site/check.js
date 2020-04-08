import { Site } from '../../../repositories'
import HttpException from '../../../core/http-exception'

const siteMapFunc = (site) => site.siteId

export default async (validUsers) => {
  const toBeAddedDocs = validUsers.map(siteMapFunc)

  const existingSites = await Site.find({ siteId: { $in: toBeAddedDocs } }, 'siteId')

  if (existingSites.length > 0) {
    throw new HttpException(422, `Site(s) já existente(s) no sistema ${existingSites.map(siteMapFunc).join(', ')}`)
  }

  return validUsers
}
