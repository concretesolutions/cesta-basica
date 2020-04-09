import React from 'react'
import PropTypes from 'prop-types'
import './Select.scss'

function Select({ value, placeholder, getValue, optionsList }) {
  const handleOnChange = (e) => getValue(e.target.value)
  return (
    <select value={value} className="customSelect" placeholder={placeholder} onChange={handleOnChange}>
      {optionsList.map((item) => {
        const { value, string } = item
        return <option key={value} value={value}>{string}</option>
      })}
    </select>
  )
}
Select.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  getValue: PropTypes.func.isRequired,
  optionsList: PropTypes.array.isRequired,
}

export default Select
