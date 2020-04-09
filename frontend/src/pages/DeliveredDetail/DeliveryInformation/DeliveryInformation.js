import React from 'react'
import PropTypes from 'prop-types'
import './DeliveryInformation.scss'
import { formatHour } from '../../../utils/formatHour'

import { evidenceOfDelivered, deliveredDate, deliveredHour, statusDelivered } from '../../../utils/strings'
import { formatDate } from '../../../utils/formatDateToptbr'
import { getHour } from '../../../utils/getHours'

export const DeliveryInformation = ({ deliveryDate, statusDelivery }) => (
  <>
    <h2 className="containerDonationDetails__evidenceTitle" dangerouslySetInnerHTML={{ __html: evidenceOfDelivered }} />

    <div className="containerDonationDetails__delivered">
      <div className="containerDonationDetails__delivered--left">
        <div
          className="containerDonationDetails__delivered__title"
          dangerouslySetInnerHTML={{ __html: deliveredDate }}
        />
        <div className="containerDonationDetails__delivered__value">{formatDate(deliveryDate)}</div>
      </div>

      <div className="containerDonationDetails__delivered--right">
        <div
          className="containerDonationDetails__delivered__title"
          dangerouslySetInnerHTML={{ __html: deliveredHour }}
        />
        <div className="containerDonationDetails__delivered__value">{formatHour(deliveryDate)}</div>
      </div>
    </div>

    <div className="containerDonationDetails__delivered--left containerDonationDetails__delivered--mt">
      <div
        className="containerDonationDetails__delivered__title"
        dangerouslySetInnerHTML={{ __html: statusDelivered }}
      />
      <div className="containerDonationDetails__delivered__value">{statusDelivery}</div>
    </div>
  </>
)

DeliveryInformation.propTypes = {
  deliveryDate: PropTypes.string.isRequired,
  statusDelivery: PropTypes.string.isRequired,
}
