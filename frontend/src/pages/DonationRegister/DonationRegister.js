import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from '../../store'

import { RegisterForm } from './Form'
import { Title } from '../../components/Title'
import { BackButton } from '../../components/ButtonIcon'

import './DonationRegister.scss'

function DonationRegister({ store, dispatch }) {
  const { leaderList, siteList } = store
  const history = useHistory()

  function goBack() {
    history.push('/donation-list')
  }

  return (
    <div className="component-container">
      <BackButton goBack={goBack} />
      <Title message="Cadastrar entrega" />
      <RegisterForm leaderList={leaderList || []} siteList={siteList || []} dispatch={dispatch} history={history} />
    </div>
  )
}

export default connect(DonationRegister)
