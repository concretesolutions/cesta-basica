import React from 'react'
import PropTypes from 'prop-types'
import './Link.scss'

function Link({ action, message }) {
  return (
    <div className="container-link">
      <a onClick={action}>{message}</a>
    </div>
  )
}
Link.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
}

export default Link
