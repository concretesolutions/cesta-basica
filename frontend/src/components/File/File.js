import React from 'react'
import PropTypes from 'prop-types'
import './File.scss'

// import { FileTypes } from './FileTypes'

function File({ placeholder, handleImage }) {
  return (
    <>
      <form className="hidden">
        <input multiple={false} onChange={handleImage} id="input-new-image" type="file" />
      </form>
      <label className="label-send-image" htmlFor="input-new-image">
        {placeholder}
      </label>
    </>
  )
}

File.propTypes = {
  placeholder: PropTypes.string,
  handleImage: PropTypes.func,
}

File.defaultProps = {
  placeholder: '',
  handleImage: () => {},
}

export default File
