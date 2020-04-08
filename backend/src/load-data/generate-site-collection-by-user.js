import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { User, Site } from '../repositories'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()

      /**
       * Generating the site collection from users and users collections
       */

      const sites = await Site.find({ siteId: { $exists: true } })

      let maxSiteId = sites.reduce((max, { siteId }) => Number(siteId) > max ? Number(siteId) : max, 0)
      console.log(maxSiteId)

      const users = await User.find() // { siteId: undefined }

      for (const user of users) {
        const { site, city, state } = user
        console.log('checking the site:', site, ' from userId: ', user.userId)

        if (!site) {
          console.log('skipping the userId: ', user.userId, ' because its site value is: ', site)
          continue
        }

        let existing = await Site.findOne({ name: site })

        if (existing) {
          if (!Number.isInteger(existing.siteId)) {
            throw new Error('The site name: ', existing.name, ' already has a crud but does not has and siteId')
          }
        } else {
          console.log('the site does not exists: ', site)

          const siteId = ++maxSiteId

          existing = await Site.create({
            siteId,
            name: site,
            city,
            state
          })

          console.log('creating a site name: ', site, ' with id: ', siteId)

          await existing.save()
        }

        if (user.siteId === existing.siteId) {
          console.log('skipping the userId: ', user.userId, ' same siteId already: ', user.siteId)
        } else {
          console.log(
            'updating the userid: ',
            user.userId,
            ' from siteId ',
            user.siteId,
            ' to siteId: ',
            existing.siteId
          )

          user.siteId = existing.siteId
          user.site = null
          user.city = null
          user.state = null
          await user.save()
        }
      }

      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
