import React from 'react'
import PropTypes from 'prop-types'

import { WaitingReceivement } from '../WaitingReceivement'
import { Legend, LegendTypes } from '../../../components/Legend'

import { ShowImageButtonWithTitle } from '../../../components/ShowImageButtonWithTitle'

import { receivedData, deadlineDate, legendPicDonationWithNewLine } from '../../../utils/strings'
import { formatDate } from '../../../utils/formatDateToptbr'
import { formatHour } from '../../../utils/formatHour'
import { formatDateTomorrow } from '../../../utils/formaDateTomorrow'

import './styles.scss'

function DeliveredLeader({ current, donation }) {
  const { received, publicPhotoUrl } = donation
  return (
    <>
      <WaitingReceivement current={current} donation={donation} />
      <div className="component-deliveredLeader-footer">
        <div>
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message={receivedData} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={formatDate(received)} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={formatHour(received)} />
        </div>
        <div>
          <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.END} message={deadlineDate} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message={formatDateTomorrow(received)} />
          <Legend type={LegendTypes.STRONG} orientation={LegendTypes.END} message={formatHour(received)} />
        </div>
      </div>
      <div className="component-deliveredLeader-imageButton">
        <ShowImageButtonWithTitle linkToImage={publicPhotoUrl} text={legendPicDonationWithNewLine} />
      </div>
    </>
  )
}

DeliveredLeader.propTypes = {
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

DeliveredLeader.defaultProps = {
  current: 2,
}

export { DeliveredLeader }
