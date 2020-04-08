import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { Donation, Site } from '../repositories'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()

      /**
       * Generating the site collection from users and donations collections
       */

      const sites = await Site.find({ siteId: { $exists: true } })
      console.log(sites)

      let maxSiteId = sites.reduce((max, { siteId }) => Number(siteId) > max ? Number(siteId) : max, 0)
      console.log(maxSiteId)

      const donations = await Donation.find() // { siteId: undefined }

      for (const donation of donations) {
        const { site, city, state } = donation
        console.log('checking the site:', site, ' from donationId: ', donation.donationId)

        if (!site) {
          console.log('skipping the donationId: ', donation.donationId, ' because its site value is: ', site)
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

        if (donation.siteId === existing.siteId) {
          console.log('skipping the donationId: ', donation.donationId, ' same siteId already: ', donation.siteId)
        } else {
          console.log(
            'updating the donationid: ',
            donation.donationId,
            ' from siteId ',
            donation.siteId,
            ' to siteId: ',
            existing.siteId
          )

          donation.siteId = existing.siteId
          donation.site = null
          donation.city = null
          donation.state = null
          await donation.save()
        }
      }

      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
