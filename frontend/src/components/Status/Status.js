import React from 'react'
import PropTypes from 'prop-types'
import './Status.scss'

function Status({ message, status }) {
  return <h5 className={`status__${status}`}>{message}</h5>
}

Status.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string,
}
Status.defaultProps = {
  status: 'in-progressive',
}

export default Status
