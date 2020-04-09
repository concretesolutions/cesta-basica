import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from '../../../store'

import { Button, ButtonTypes } from '../../../components/Button'
import { DonationIsEmpty, DonationItem } from '../../DonationList/CommonComponents'

import './ChargeList.scss'

const ChargeList = ({ history, match, store }) => {
  const {
    user: { role },
  } = store

  const { url } = match

  const chargeList = []

  const render = () => {
    return (
      chargeList.length > 0 ? (
        <div className={`containerDonation__list containerDonation__list--${role}`}>
          {chargeList.map((item) => {
            const { quantity, status, donationId, } = item
            return (
              <DonationItem
                title={donationId}
                quantity={quantity}
                key={donationId}
                stateDonation={status}
                donationId={donationId}
                userRole={role}
              />
            )
          })}
        </div>
      ) : (
        <DonationIsEmpty whichMessage={role} />
      )
    )
  }

  return (
    <div className="chargeList">
      {render()}

      <div className="chargeList__button">
      <Link
        to={{
          pathname: `${url}/add`,
          state: {
            title: 'Adicionar carga',
          },
        }}
      >
        <Button
          size={ButtonTypes.LARGE}
          typeButton="button"
          message={'Adicionar carga'}
        />
      </Link>

      </div>
    </div>
  )
}

export default connect(ChargeList)

