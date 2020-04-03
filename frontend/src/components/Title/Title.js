import React from 'react'
import PropTypes from 'prop-types'
import './Title.scss'

export default function Title({ message }) {
  return <span className="titleTerms">{message}</span>
}
Title.propTypes = {
  message: PropTypes.string.isRequired,
}

Title.propTypes = {
  message: PropTypes.string.isRequired,
}
