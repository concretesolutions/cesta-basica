import React from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'

function InputSelectSearch({ value, handleChange, placeholder, data }) {
  return (
    <>
      <Input
        value={value}
        placeholder={placeholder}
        listName={value}
        name="data-list-choice"
        handleOnChange={handleChange}
      />

      <datalist id={value}>
        {data.map(({ value, label }) => (
          <option>{label}</option>
        ))}
      </datalist>
    </>
  )
}

InputSelectSearch.propTypes = {
  data: PropTypes.any.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export { InputSelectSearch }
