import React from 'react'
import PropTypes from 'prop-types'
import { logoHorizontal, logoVertical, backIcon } from '../../assets/icons'

export const LogoHorizontal = ({ height }) => <img src={logoHorizontal} alt="logo of app" height={height} />
LogoHorizontal.propTypes = { height: PropTypes.string }
LogoHorizontal.defaultProps = { height: '40' }

export const LogoVertical = ({ height }) => <img src={logoVertical} alt="logo of app" height={height} />
LogoVertical.propTypes = { height: PropTypes.string }
LogoVertical.defaultProps = { height: '40' }

export const LogoBack = ({ height }) => <img src={backIcon} alt="voltar" height={height} />
LogoBack.propTypes = { height: PropTypes.string }
LogoBack.defaultProps = { height: '24' }