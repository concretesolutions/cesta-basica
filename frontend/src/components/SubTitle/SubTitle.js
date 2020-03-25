import React from 'react'
import PropTypes from 'prop-types'
import './SubTitle.scss'

import { SubTitleTypes } from './SubTitleTypes'

function SubTitle({ size, width, type, message }) {
  return <h3 className={`subtitle ${size} ${type} ${width}`}>{message}</h3>
}
SubTitle.propTypes = {
  message: PropTypes.string.isRequired,
  size: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string,
}
SubTitle.defaultProps = {
  type: SubTitleTypes.NORMAL,
  size: SubTitleTypes.SMALL,
  width: '',
}

export default SubTitle
