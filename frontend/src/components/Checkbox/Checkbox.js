import React from 'react'
import PropTypes from 'prop-types'
import './Checkbox.scss'

function Checkbox({ message, handleChecked, checked }) {
  return (
    <>
      <label className="container-checkbox">
        {message}
        <input
          name="checkbox"
          onChange={handleChecked}
          tabIndex={0}
          checked={checked}
          className="checkbox"
          type="checkbox"
        />
        <span className="checkmark" />
      </label>
    </>
  )
}
Checkbox.propTypes = {
  message: PropTypes.string,
  handleChecked: PropTypes.func,
  checked: PropTypes.bool,
}

Checkbox.defaultProps = {
  message: '',
  handleChecked: () => {},
  checked: false,
}

export default Checkbox
