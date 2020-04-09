import React from 'react'
import PropTypes from 'prop-types'
import './DeliveredDetail.scss'

import { connect } from '../../store'

import { Header } from '../../components/Header'

import { DeliveryInformation } from './DeliveryInformation'
import { Delivered } from './Delivered'
import { Undeliverable } from './Undeliverable'

const checkStatus = {
  1: null,
  2: true,
  3: false,
}

function DeliveredDetail({ store, history, match }) {
  const { voucher } = match.params
  const { goBack } = history
  const {
    cardList,
    donation: { vouchers },
  } = store

  const getDataByVoucher = (data) => data.find(({ voucherId }) => voucherId === voucher)

  const { delivered, receivedCpf, receivedName, statusText, status, leaderComment } = getDataByVoucher(cardList)
  const { publicPhotoUrl } = getDataByVoucher(vouchers)
  return (
    <div className="containerDonationDetails">
      <Header title={voucher} onGoBackClick={goBack} />
      <DeliveryInformation deliveryDate={delivered} statusDelivery={statusText} />
      {checkStatus[status] ? (
        <Delivered recipientName={receivedName} recipientCPF={receivedCpf} linkToImage={publicPhotoUrl} />
      ) : (
        <Undeliverable comment={leaderComment} />
      )}
    </div>
  )
}

DeliveredDetail.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
      voucher: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default connect(DeliveredDetail)
