import React from 'react'
import { useHistory } from 'react-router-dom'
import { func, string } from 'prop-types'
import './DonationHeader.scss'

import { icExit } from '../../../../assets/icons'
import { connect, types } from '../../../../store'

import { donationTitlePage, exitText } from '../../../../utils/strings'

function DonationHeader({ dispatch, title }) {
  const history = useHistory()
  function exit() {
    dispatch({ type: types.SET_LOGOUT })
    history.push('/login')
  }
  return (
    <div className="fixedHeader">
      <header className="containerHeader">
        <h2>{title}</h2>
        <span>
          <a onClick={exit}>
            <img src={icExit} alt="alo" />
            {exitText}
          </a>
        </span>
      </header>
    </div>
  )
}

DonationHeader.propTypes = {
  dispatch: func.isRequired,
  title: string,
}

DonationHeader.defaultProps = {
  title: donationTitlePage,
}

export default connect(DonationHeader)
