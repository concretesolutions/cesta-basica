import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import './Login.scss'

import { connect } from '../../store'
import { Auth } from '../../services/login'

import {
  titleLoginScreen,
  placeholderCPF,
  typeYourPassword,
  errorMessageInvalidLogin,
  errorMessageInvalidPassword,
} from '../../utils/strings'

import { Loader } from '../../components/Loader'
import { LogoHorizontal } from '../../components/Logo'
import { Input, inputTypes } from '../../components/Input'
import { Button, ButtonTypes } from '../../components/Button'

function Login({ dispatch }) {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await Auth({ login, password }, dispatch, history)
    setLoading(false)
    setError(true)
  }
  useEffect(() => {
    error && setError(false)
  }, [login, password])
  return (
    <>
      {loading && <Loader />}
      <div className="containerLogo">
        <LogoHorizontal />
      </div>

      <div className="containerLogin">
        <h2 className="containerLogin--textCenter">{titleLoginScreen}</h2>
        <form onSubmit={handleSubmit} className="containerLogin__form">
          <div style={{ marginTop: '.7rem' }} />
          <Input
            placeholder={placeholderCPF}
            inputType={inputTypes.CPF}
            minLength="14"
            maxLength="14"
            value={login}
            handleOnChange={setLogin}
            withError={error}
            messageError={errorMessageInvalidLogin}
          />

          <div style={{ marginTop: '2rem' }} />
          <Input
            placeholder={typeYourPassword}
            inputType={inputTypes.PASSWORD}
            minLength="8"
            maxLength="14"
            value={password}
            handleOnChange={setPassword}
            withError={error}
            messageError={errorMessageInvalidPassword}
          />

          <div style={{ marginTop: '2.3rem' }} />

          <div className="containerLogin__form__button">
            <Button type={ButtonTypes.FILL} message="Enviar" />
          </div>
        </form>
      </div>
    </>
  )
}

Login.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(Login)
