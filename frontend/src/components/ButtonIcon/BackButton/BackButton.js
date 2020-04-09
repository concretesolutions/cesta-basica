import React from 'react'
import PropTypes from 'prop-types'

import { ButtonIcon } from '../index'
import { LogoBack } from '../../Logo'
import { Legend, LegendTypes } from '../../Legend'

import './BackButton.scss'
import { back } from '../../../utils/strings'

export default function BackButton({ goBack }) {
  return (
    <div className="container-back-button">
      <ButtonIcon handleClick={goBack}>
        <LogoBack height="10" />
      </ButtonIcon>
      <Legend type={LegendTypes.STRONG} message={back} />
    </div>
  )
}

BackButton.proptTypes = {
  goBack: PropTypes.func.isRequired,
}
