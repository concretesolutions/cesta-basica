import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Input, InputSelectSearch, inputTypes } from '../../../components/Input'
import { ConfirmButton } from '../../../components/Button/ConfirmButton'
import { Loader } from '../../../components/Loader'

import { LeadersList } from '../../../services/API/leaderList'
import { DonationRegister } from '../../../services/API/donationList'
import { SiteList } from '../../../services/API/siteList'

import './Form.scss'

function RegisterForm({ leaderList, siteList, dispatch, history }) {
  const [leaderLogin, setLeaderLogin] = useState('')
  const [siteId, setSiteId] = useState('')
  const [donationId, setDonationId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [sentDate, setSentDate] = useState('')
  const [loading, setLoading] = useState(false)

  function verifyRequest() {
    return !!(leaderLogin === '' || siteId === '' || donationId === '' || quantity === '' || sentDate === '')
  }

  useEffect(() => {
    if (leaderLogin.length >= 3) {
      getLeaderList()
    }
  }, [leaderLogin])

  async function getLeaderList() {
    await LeadersList(dispatch, leaderLogin)
  }

  useEffect(() => {
    getSites()
  }, [siteId])

  async function getSites() {
    await SiteList(dispatch)
  }

  const convertListLeader = leaderList.map(({ name, login }) => ({ value: login, label: name }))
  const convertSiteList = siteList.map(({ name, siteId }) => ({ value: siteId, label: name }))

  function findLeaderByName() {
    const leader = leaderList.find((element) => element.name === leaderLogin)
    if (leader) {
      return leader
    }
    return ''
  }
  function findSiteByName() {
    const site = siteList.find((element) => element.name === siteId)
    if (site) {
      return site
    }
    return ''
  }
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const { login: leaderLogin } = findLeaderByName()
    const { siteId: findSiteId } = findSiteByName()
    const data = { siteId: findSiteId, leaderLogin, donationId, quantity, sentDate }
    await DonationRegister(data)
    setLoading(false)
    history.push('/donation-list')
  }

  return (
    <div className="form-container">
      {loading && <Loader />}
      <form className="form-content" onSubmit={handleSubmit}>
        <InputSelectSearch
          data={convertListLeader}
          value={leaderLogin}
          placeholder="Escolher lider"
          inputType={inputTypes.TEXT}
          handleChange={setLeaderLogin}
        />
        <InputSelectSearch
          data={convertSiteList}
          value={siteId}
          placeholder="Unidade"
          inputType={inputTypes.TEXT}
          handleChange={setSiteId}
        />
        <Input value={donationId} placeholder="Bordero" handleOnChange={setDonationId} inputType={inputTypes.TEXT} />
        <Input
          value={quantity}
          placeholder="Quantidade de cartoes"
          inputType={inputTypes.TEXT}
          handleOnChange={setQuantity}
        />
        <Input
          value={sentDate}
          placeholder="Data de envio"
          inputType={inputTypes.DATE}
          handleOnChange={setSentDate}
          maxsentDate="9999-12-31"
        />
        <div className="component-footer">
          <ConfirmButton disable={verifyRequest()} />
        </div>
      </form>
    </div>
  )
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export { RegisterForm }
