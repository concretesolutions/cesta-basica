import React from 'react'
import PropTypes from 'prop-types'
import './DonationItem.scss'

function DonationItem({ title, quantity, stateDonation, isComplete }) {
  return (
    <div className="donationItem">
      <div className="donationItem__content">
        <span className="donationItem__content__title">{title}</span>
        <div>
          <span className="donationItem__content__quantity">{quantity}</span>
          <span className={`floatRigth donationItem__content__state${isComplete && '--complete'}`}>
            {stateDonation}
          </span>
        </div>
      </div>
    </div>
  )
}

DonationItem.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  stateDonation: PropTypes.string.isRequired,
  isComplete: PropTypes.string,
}

DonationItem.defaultProps = {
  isComplete: false,
}

export default DonationItem
