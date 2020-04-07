import React from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'

function InputSelectSearch({ value, handleChange, placeholder, data }) {

  console.log(placeholder, data)

  return (
    <>
      <Input
        value={value}
        placeholder={placeholder}
        listName="data-list"
        name="data-list-choice"
        handleOnChange={handleChange}
      />

      <datalist id="data-list">
        {data.map((item) => (
            <option value={item.name} />
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
