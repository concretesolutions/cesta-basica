import React from 'react'
import PropTypes from 'prop-types'
import './Input.scss'

import { inputTypes } from './InputTypes'
import { maskToCpf, maskToTelephone } from '../../utils/masksInput'
import { icWarning, icSuccess } from '../../assets/icons'

function Input({
  listName,
  maxDate,
  placeholder,
  size,
  inputType,
  maxLength,
  minLength,
  value,
  handleOnChange,
  isRequired,
  withError,
  messageError,
}) {
  function formatValue(inputValue) {
    switch (inputType) {
      case inputTypes.CPF:
        return maskToCpf(inputValue)
      case inputTypes.CELPHONE:
        return maskToTelephone(inputValue)
      default:
        return inputValue
    }
  }

  return (
    <>
      <div className="containerInput">
        <input
          list={listName}
          max={maxDate}
          className={`customInput ${size} ${withError ? 'customInput--error' : ''}`}
          maxLength={maxLength}
          minLength={minLength}
          placeholder={placeholder}
          title={placeholder}
          type={inputType}
          value={formatValue(value)}
          onChange={(e) => handleOnChange(e.target.value)}
          required={isRequired}
        />
        {withError && (
          <img
            className="customInput__icon"
            src={icWarning}
            alt="icon for information warning or success"
            height={18}
          />
        )}
      </div>
      {withError && messageError && <span className="messageError">{messageError}</span>}
    </>
  )
}

Input.propTypes = {
  listName: PropTypes.string,
  maxDate: PropTypes.string,
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  maxLength: PropTypes.string,
  minLength: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  withError: PropTypes.bool,
  messageError: PropTypes.string,
  size: PropTypes.string,
}

Input.defaultProps = {
  listName: '',
  maxDate: '9999-12-31',
  placeholder: '',
  inputType: inputTypes.TEXT,
  maxLength: '120',
  minLength: '2',
  isRequired: true,
  withError: false,
  size: '',
  messageError: '',
}

export default Input
