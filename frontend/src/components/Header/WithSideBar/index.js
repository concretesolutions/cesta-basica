import React from 'react'
import PropTypes from 'prop-types'

import { HeaderWithGoBack } from '../WithGoBack'
import { Sidebar } from '../../Sidebar'

export default function HeaderWithSideBar({ onGoBackClick, title, steps, current }) {
  return (
    <>
      <HeaderWithGoBack onGoBackClick={onGoBackClick} title={title} />
      <Sidebar current={current} steps={steps} />
    </>
  )
}

HeaderWithSideBar.propTypes = {
  steps: PropTypes.number,
  current: PropTypes.number,
  title: PropTypes.string.isRequired,
  onGoBackClick: PropTypes.func.isRequired,
}

HeaderWithSideBar.defaultProps = {
  steps: 3,
  current: 1,
}
