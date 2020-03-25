import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

import { ButtonTypes } from './ButtonTypes'

function Button({ type, size, message, disable, handleClick }) {
  return (
    <button
      type="submit"
      tabIndex={0}
      aria-label={message}
      disabled={disable}
      onClick={handleClick}
      className={`button ${type} ${size}`}
    >
      {message}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  disable: PropTypes.bool,
  handleClick: PropTypes.func,
  size: PropTypes.string,
}

Button.defaultProps = {
  type: ButtonTypes.FILL,
  size: ButtonTypes.MEDIUM,
  message: '',
  disable: false,
  handleClick: () => {},
}
export default Button
