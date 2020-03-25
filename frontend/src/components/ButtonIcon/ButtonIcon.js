import React from 'react'
import PropTypes from 'prop-types'
import './ButtonIcon.scss'
import * as Icons from '../Logo'

import { ButtonIconTypes } from './ButtonIconTypes'

function ButtonIcon({ children, size, handleClick, disable, type }) {
  return (
    <button
      type="submit"
      tabIndex={0}
      disabled={disable}
      onClick={handleClick}
      className={`button-icon ${type} ${size}`}
    >
      {children}
    </button>
  )
}

ButtonIcon.propTypes = {
  disable: PropTypes.bool,
  handleClick: PropTypes.func,
  size: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
}

ButtonIcon.defaultProps = {
  type: ButtonIconTypes.FILL,
  size: ButtonIconTypes.MEDIUM,
  icon: '',
  disable: false,
  handleClick: () => {},
}
export default ButtonIcon
