import React from 'react'
import PropTypes from 'prop-types'
import { logoHorizontal, logoVertical, backIcon, basket, icClose } from '../../assets/icons'

export const LogoHorizontal = ({ height }) => <img src={logoHorizontal} alt="logo of app" height={height} />
LogoHorizontal.propTypes = { height: PropTypes.string }
LogoHorizontal.defaultProps = { height: '40' }

export const LogoVertical = ({ height }) => <img src={logoVertical} alt="logo of app" height={height} />
LogoVertical.propTypes = { height: PropTypes.string }
LogoVertical.defaultProps = { height: '40' }

export const LogoBack = ({ height }) => <img src={backIcon} alt="voltar" height={height} />
LogoBack.propTypes = { height: PropTypes.string }
LogoBack.defaultProps = { height: '24' }

export const LogoClose = ({ height }) => <img src={icClose} alt="fechar" height={height} />
LogoBack.propTypes = { height: PropTypes.number }
LogoBack.defaultProps = { height: '24' }

export const LogoBasket = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.8877 11.4453C13.9603 10.7849 12.6818 10.9863 12.0003 11.8902C11.3189 10.9886 10.0403 10.7849 9.11292 11.4453C8.17154 12.1174 7.95142 13.4264 8.6235 14.3678L11.6303 17.5619C11.6982 17.6556 11.8013 17.7188 11.9183 17.7399C11.9441 17.7446 11.9675 17.7493 11.9933 17.7493C11.9956 17.7493 11.998 17.7493 12.0003 17.7493C12.0026 17.7493 12.005 17.7493 12.0073 17.7493C12.0331 17.7493 12.0588 17.7446 12.0823 17.7399C12.1994 17.7188 12.3047 17.6556 12.3703 17.5619L15.3771 14.3678C16.0492 13.4264 15.8291 12.1174 14.8877 11.4453Z" fill="#A5A5A5"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M14.6035 3.35427C14.4197 3.02238 14.0017 2.90232 13.6698 3.08612C13.3379 3.26992 13.2178 3.68797 13.4016 4.01986L15.8019 8.35415H8.19813L10.5969 4.0197C10.7806 3.68775 10.6605 3.26974 10.3285 3.08603C9.99658 2.90232 9.57856 3.02249 9.39486 3.35444L6.62788 8.35415H3.72933C2.55845 8.35415 1.80206 9.29085 2.04561 10.436L3.73635 18.3722C3.97989 19.5173 5.13672 20.454 6.30759 20.454H17.6932C18.8641 20.454 20.0209 19.5173 20.2644 18.3722L21.9552 10.436C22.1964 9.29085 21.44 8.35415 20.2691 8.35415H17.3724L14.6035 3.35427ZM16.436 9.49927L17.0548 10.6166C17.2386 10.9485 17.6566 11.0685 17.9885 10.8847C18.3204 10.7009 18.4405 10.2829 18.2567 9.95099L18.0065 9.49927H20.2691C20.4822 9.49927 20.6532 9.56484 20.7515 9.68661C20.8499 9.80604 20.878 9.9887 20.8335 10.1971L19.1427 18.1333C19.0116 18.7492 18.3208 19.3089 17.6908 19.3089H6.30525C5.67766 19.3089 4.9845 18.7492 4.85336 18.1333L3.16262 10.1971C3.11813 9.9887 3.14623 9.80604 3.24458 9.68661C3.34294 9.56718 3.51388 9.49927 3.72698 9.49927H5.99415L5.74407 9.95115C5.56036 10.2831 5.68053 10.7011 6.01247 10.8848C6.34442 11.0685 6.76243 10.9484 6.94614 10.6164L7.56439 9.49927H16.436Z" fill="#A5A5A5"/>
  </svg>
)
