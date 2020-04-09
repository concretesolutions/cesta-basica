import React from 'react'
import PropTypes from 'prop-types'

import { commentLeader } from '../../../utils/strings'

export const Undeliverable = ({ comment }) => (
  <div className="containerDonationDetails__delivered--mt">
    <span className="containerDonationDetails__delivered__title">{commentLeader}</span>
    <div className="containerDonationDetails__delivered__comment">{comment}</div>
  </div>
)

Undeliverable.propTypes = {
  comment: PropTypes.string.isRequired,
}
