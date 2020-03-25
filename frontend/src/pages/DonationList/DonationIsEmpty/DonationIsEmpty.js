import React from 'react'
import './DonationIsEmpty.scss'

import { donationListVoidText } from '../../../utils/strings'
import { icEmptyDonationList } from '../../../assets/icons'

const DonationIsEmpty = () => (
  <div className="containerIsEmpty">
    <span>{donationListVoidText}</span>
    <img src={icEmptyDonationList} alt="void basket" />
  </div>
)

export default DonationIsEmpty
