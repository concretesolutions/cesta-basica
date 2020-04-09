import React from 'react'
import PropTypes from 'prop-types'
import './File.scss'

import { icSuccess } from '../../assets/icons'

function File({ placeholder, handleImage, file, type }) {
  return (
    <>
      <form className="hidden">
        <input
          multiple={false}
          onChange={handleImage}
          id="input-new-image"
          type="file"
          accept={type}
          onClick={(event) => {
            event.target.value = null
          }}
        />
      </form>

      {!file ? (
        <label className="label-send-image" htmlFor="input-new-image">
          {placeholder}
        </label>
      ) : (
        <p className="feedback">
          <img src={icSuccess} alt="icon for information warning or success" height={18} />
        </p>
      )}
    </>
  )
}

File.propTypes = {
  placeholder: PropTypes.string,
  handleImage: PropTypes.func,
  file: PropTypes.string,
  type: PropTypes.string,
}

File.defaultProps = {
  placeholder: '',
  handleImage: () => {},
  file: '',
  type: 'image/png, image/jpeg',
}

export default File
