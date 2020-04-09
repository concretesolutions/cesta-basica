import React from 'react'
import PropTypes from 'prop-types'

import { completeName, CPF, deliveredPhoto, deliveredCellphone } from '../../../utils/strings'

import { maskToCpf, maskToTelephone } from '../../../utils/masksInput'
import { ShowImageButtonWithTitle } from '../../../components/ShowImageButtonWithTitle'

export const Delivered = ({ recipientName, recipientCPF, linkToImage, receivedContactNumber }) => (
  <>
    <div className="containerDonationDetails__delivered--mt containerDonationDetails__delivered--left">
      <div className="containerDonationDetails__delivered__title" dangerouslySetInnerHTML={{ __html: completeName }} />
      <div className="containerDonationDetails__delivered__value">{recipientName}</div>
    </div>

    {recipientCPF && (
      <div className="containerDonationDetails__delivered--mt containerDonationDetails__delivered--left">
        <div className="containerDonationDetails__delivered__title">{CPF}</div>
        <div className="containerDonationDetails__delivered__value">{maskToCpf(String(recipientCPF))}</div>
      </div>
    )}

    {receivedContactNumber && (
      <div className="containerDonationDetails__delivered--mt containerDonationDetails__delivered--left">
        <div className="containerDonationDetails__delivered__title">{deliveredCellphone}</div>
        <div className="containerDonationDetails__delivered__value">{maskToTelephone(receivedContactNumber)}</div>
      </div>
    )}

    <div className="containerDonationDetails__delivered--mt" />
    <ShowImageButtonWithTitle linkToImage={linkToImage} text={deliveredPhoto} />
  </>
)

Delivered.propTypes = {
  recipientName: PropTypes.string.isRequired,
  recipientCPF: PropTypes.string,
  linkToImage: PropTypes.string,
}

Delivered.defaultProps = {
  recipientCPF: '',
  linkToImage: '',
}
