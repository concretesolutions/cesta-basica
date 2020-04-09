import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { Loader } from '../../../components/Loader'
import { DeliveredLeader } from '../DeliveredLeader'
import { CardList } from '../../../components/CardList'

import { connect } from '../../../store'

function DonationDetailsWithCardList({ current, donation, store }) {
  const [loading, setLoading] = useState(false)
  const { push } = useHistory()
  function onClick(idCard) {
    const { statusText } = store.cardList.find(({ voucherId }) => voucherId === idCard)
    if (statusText === 'Entregue' || statusText === 'Não Entregue') {
      push(`/donation/${donation.donationId}/delivered-details/${idCard}`)
    }
  }
  return (
    <>
      {loading && <Loader />}
      <DeliveredLeader current={current} donation={donation} />
      <CardList setLoading={setLoading} handleClick={onClick} />
    </>
  )
}

DonationDetailsWithCardList.propTypes = {
  current: PropTypes.number,
  donation: PropTypes.shape({
    status: PropTypes.string.isRequired,
    statusText: PropTypes.string.isRequired,
    unitName: PropTypes.string.isRequired,
    leaderName: PropTypes.string.isRequired,
    deliveredDate: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
  }).isRequired,
}

DonationDetailsWithCardList.defaultProps = {
  current: 3,
}

export default connect(DonationDetailsWithCardList)
