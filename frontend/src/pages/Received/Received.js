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

import './Received.scss'

import {
  titleDonation,
  legendDonationType,
  statusDonationWait,
  legendDonationWaitDate,
  legendDonationWaitAmount,
  legendDonationReceivedButton,
  legendDonationDateFinal,
} from '../../utils/strings'
import { handleDonationReceived } from '../../services/handles'

function ReceivedPage({ store, dispatch }) {
  const { id } = useParams()

  return (
    <div className="container-received">
      <div className="header-received">
        <Title message={`${titleDonation} ${id}`} />
        <Status message={statusDonationWait} />
        <Sidebar current={2} />
      </div>
      <div className="details-received">
        <div className="details-date">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={legendDonationType} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={store.donation.received.type} />
        </div>
        <div className="details-amount">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={legendDonationWaitAmount} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message={store.donation.received.amount} />
        </div>
      </div>
      <div className="details-received">
        <div className="details-date">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={legendDonationWaitDate} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={store.donation.received.date} />
        </div>
        <div className="details-amount">
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={legendDonationDateFinal} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message={store.donation.received.deadline} />
        </div>
      </div>
      <hr />
      <div className="main-received">
        <Paragraph size={ParagraphTypes.MEDIUM} content="descriptionDonationReceived" />
      </div>
      <div className="footer-received">
        <Button
          handleClick={() => handleDonationReceived('current')}
          size={ButtonTypes.LARGE}
          message={legendDonationReceivedButton}
        />
      </div>
    </div>
  )
}
ReceivedPage.propTypes = {
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

export default connect(ReceivedPage)
