const filterEntity = {
  voucher: Voucher,
  donation: Donation,
  user: User,
  site: Site
}

function Voucher ({
  leaderName,
  siteId,
  status,
  listDonationId,
  state,
  city,
  dateTo,
  dateFrom
}) {
  return {
    leaderName,
    siteId,
    status,
    listDonationId,
    state,
    city,
    dateTo:toDate(dateTo),
    dateFrom:toDate(dateFrom)
  }
}

function Donation ({
  leaderName,
  siteId,
  status,
  listDonationId,
  state,
  city,
  dateTo,
  dateFrom
}) {

  return {
    leaderName,
    siteId,
    status,
    listDonationId,
    state,
    city,
    dateTo:toDate(dateTo),
    dateFrom:toDate(dateFrom)
  }
}

function User ({ name, siteName, state, city }) {
  return {
    name: name ? verifyField(name) : null,
    siteName: verifyField(siteName),
    state: verifyField(state),
    city: verifyField(city)
  }
}

function Site ({ state, city }) {
  return {
    state: verifyField(state),
    city: verifyField(city)
  }
}

function regexp (value, sign = '', opt) {
  return new RegExp(`${value}${sign}`, opt)
}

function verifyField (value) {
  return value ? regexp(value, '$', 'i') : regexp('^')
}

function toDate(date) {
  return date instanceof Date ? date : new Date(date)
}

module.exports = (entity, filters) => {
  return filterEntity[entity](filters)
}
