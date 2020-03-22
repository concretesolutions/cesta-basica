import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect, types } from '../../store'
import './Login.scss'

import { titleLoginScreen, subTitleLoginScreen, placeholderCPF, typeYourPassword } from '../../utils/strings'

import { Input, inputTypes } from '../../components/Input'
import { Button } from '../../components/Button'

function Login({ store, dispatch }) {
  const [CPF, setCPF] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    dispatch({
      type: types.SET_USER,
      payload: {
        login: CPF,
        password,
      },
    })
  }

  return (
    <div className="containerLogin">
      <h2 className="containerLogin--textCenter">{titleLoginScreen}</h2>
      <h5 className="containerLogin--textCenter containerLogin__subtitle">{subTitleLoginScreen}</h5>
      {JSON.stringify(store)}
      <form onSubmit={handleSubmit} className="containerLogin__form">
        <div style={{ marginTop: '1.8rem' }} />
        <Input
          placeholder={placeholderCPF}
          inputType={inputTypes.CPF}
          minLength="14"
          maxLength="14"
          value={CPF}
          handleOnChange={setCPF}
        />

        <div style={{ marginTop: '1.2rem' }} />
        <Input
          placeholder={typeYourPassword}
          inputType={inputTypes.PASSWORD}
          minLength="14"
          maxLength="14"
          value={password}
          handleOnChange={setPassword}
        />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button message="Enviar" />
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(Login)
