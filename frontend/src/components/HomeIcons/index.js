import React from 'react'
import PropTypes from 'prop-types'
import { groupIcons } from '../../assets/icons'

export const GroupIcons = ({ height }) => <img src={groupIcons} alt="group of helpful itens" height={height} />
GroupIcons.propTypes = { height: PropTypes.string }
GroupIcons.defaultProps = { height: '145' }
