import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { Status } from '../../components/Status'
import { Sidebar } from '../../components/Sidebar'
import { Legend, LegendTypes } from '../../components/Legend'
import { Paragraph, ParagraphTypes } from '../../components/Paragraph'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Button, ButtonTypes } from '../../components/Button'

import './Donation.scss'

import {
  contate,
  contateNumber,
  titleDonation,
  statusDonationWait,
  legendDonationWaitDate,
  legendDonationWaitAmount,
  legendDonationWaitButton,
} from '../../utils/strings'
import { handleDonationReceived } from '../../services/handles'

function DonationPage({ store, dispatch }) {
  const { id } = useParams()

  return (
    <div className="container-donation">
      <div className="header-donation">
        <Title message={`${titleDonation} ${id}`} />
        <Status message={statusDonationWait} />
        <Sidebar />
      </div>
      <div className="details-donation">
        <div className="details-date">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={legendDonationWaitDate} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={store.donation.received.date} />
        </div>
        <div className="details-amount">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={legendDonationWaitAmount} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message={store.donation.received.amount} />
        </div>
      </div>
      <hr />
      <div className="main-donation">
        <Paragraph size={ParagraphTypes.MEDIUM} content="legendDonationWaitInformation" />
        <SubTitle size={SubTitleTypes.MEDIUM} type={SubTitleTypes.STRONG} message={contate} />
        <SubTitle size={SubTitleTypes.MEDIUM} type={SubTitleTypes.NORMAL} message={contateNumber} />
      </div>
      <hr />
      <div className="footer-donation">
        <Paragraph content="legendDonationWaitInformationButton" />
        <Button
          handleClick={() => handleDonationReceived('prof')}
          size={ButtonTypes.LARGE}
          message={legendDonationWaitButton}
        />
      </div>
    </div>
  )
}
DonationPage.propTypes = {
  store: PropTypes.shape({
    donation: PropTypes.shape({
      received: PropTypes.shape({
        date: PropTypes.string,
        amount: PropTypes.number,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(DonationPage)
