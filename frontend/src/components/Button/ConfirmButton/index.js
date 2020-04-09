import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '../index'
import { ButtonTypes } from '../ButtonTypes'

import { confirm } from '../../../utils/strings'

function ConfirmButton({ handleClick, disable }) {
  return <Button disable={disable} handleClick={handleClick} size={ButtonTypes.LARGE} message={confirm} />
}

ConfirmButton.propTypes = {
  disable: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
}

ConfirmButton.defaultProps = {
  disable: false,
}

export { ConfirmButton }
