import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { connect, types } from '../../store'
import { Title } from '../../components/Title'
import { Items, ItemsTypes } from '../../components/Items'
import { LogoBack } from '../../components/Logo'
import { Input, inputTypes } from '../../components/Input'
import { File } from '../../components/File'
import { Legend, LegendTypes } from '../../components/Legend'
import { Paragraph, ParagraphTypes } from '../../components/Paragraph'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Button, ButtonTypes } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'
import { Loader } from '../../components/Loader'
import { Select } from '../../components/Select'

import './ReceivedCurrentProf.scss'
import { DonationVoucher } from '../../services/API/donationList'
import {
  confirm,
  back,
  titleReceivedProf,
  legendAddPicPersonReceiveCard,
  legendPhotoDeliveredDone,
  legendInputAddPic,
  legendInputFullName,
  placeholderCPF,
} from '../../utils/strings'

import * as analytics from '../../services/analytics'

function ReceivedCurrentProfPage({ store, dispatch }) {
  const { id, voucher } = useParams()
  const { goBack } = useHistory()
  const [fullName, setFullName] = useState('')
  const [comment, setComment] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [CPF, setCPF] = useState('')
  const [image, setImage] = useState()
  const [delivered, setDelivered] = useState(false)
  const [loading, setLoading] = useState(false)
  const donationInfo = store.cardList.find((item) => item.voucherId === voucher)

  function isDelivered() {
    const { status, receivedName, receivedCpf, receivedContactNumber, leaderComment } = donationInfo
    if (status === 2) {
      setFullName(receivedName || '')
      setCPF(receivedCpf || '')
      setPhoneNumber(receivedContactNumber || '')
      return setDelivered('true')
    } else if (status === 3) {
      setComment(leaderComment)
      setDelivered('false')
    } else {
      setDelivered('null')
    }
  }

  useEffect(() => {
    isDelivered()
  }, [])

  function handleOnchangeSelect(value) {
    setDelivered(value)
    if (value === 'false') {
      setFullName('')
      setCPF('')
    }
  }

  const optionsList = [
    {
      value: 'null',
      string: 'Selecione',
    },
    {
      value: true,
      string: 'Entregue',
    },
    {
      value: false,
      string: 'Não Entregue',
    },
  ]

  const disableButton = delivered !== 'null' ? (delivered === 'true' ? !(fullName !== '' && image) : false) : true

  const handleImageFile = (event) => {
    setImage(event.target.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const clearCpf = CPF.replace(/\./g, '').replace(/-/g, '')
    const data = { id, voucher, delivered, CPF: clearCpf, fullName, image, comment, phoneNumber }

    if (delivered === 'false') {
      const cleanDataUserDonation = { ...donationInfo }
      cleanDataUserDonation.receivedCpf = ''
      cleanDataUserDonation.delivered = ''
      cleanDataUserDonation.receivedName = ''

      const cleanCard = store.cardList.filter((card) => card.voucherId !== donationInfo.voucherId)

      const newCardList = [...cleanCard, cleanDataUserDonation]

      dispatch({ type: types.SET_CARD_LIST, payload: newCardList })
    }
    const updateDonate = await DonationVoucher(data, store)
    if (updateDonate) {
      goBack()
    }

    const deliveryStatus = optionsList.find((option) => `${option.value}` === delivered)
    analytics.receivedProf(deliveryStatus.string, voucher)

    setLoading(false)
  }

  return (
    <>
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="container-donation-received-current-prof">
          <div className="sidebar-donation-received-current-prof">
            <ButtonIcon handleClick={goBack}>
              <LogoBack height={10} />
            </ButtonIcon>
            <Legend type={LegendTypes.STRONG} message={back} />
          </div>

          <div className="header-donation-received-current-prof">
            <Title message={titleReceivedProf} />
            <Paragraph size={ParagraphTypes.HALF} content="descriptionDonationProf" />

            <div className="details-received">
              <div className="details-status">
                <Legend type={LegendTypes.LIGHT} orientation={LegendTypes.START} message="Cartão" />
                <Legend type={LegendTypes.STRONG} orientation={LegendTypes.START} message={voucher} />
              </div>
            </div>

            <Select
              value={delivered}
              placeholder="Status da entrega do cartão"
              getValue={handleOnchangeSelect}
              optionsList={optionsList}
            />
            <div style={{ paddingBottom: '.7rem' }} />
            {delivered === 'true' ? (
              <>
                <Input
                  placeholder={legendInputFullName}
                  inputType={inputTypes.TEXT}
                  minLength="2"
                  maxLength="30"
                  value={fullName}
                  handleOnChange={setFullName}
                />

                <Input
                  placeholder='Digite telefone'
                  inputType={inputTypes.TEXT}
                  minLength="2"
                  maxLength="30"
                  value={phoneNumber}
                  handleOnChange={setPhoneNumber}
                />

                <Input
                  placeholder={placeholderCPF}
                  inputType={inputTypes.CPF}
                  minLength="14"
                  maxLength="14"
                  value={CPF}
                  isRequired={false}
                  handleOnChange={setCPF}
                />

                <Paragraph size={ParagraphTypes.SMALL} content="legendAddPicPersonReceiveCard" />

                <div className="main-donation-received-current-prof">
                  <SubTitle
                    type={SubTitleTypes.LIGHT}
                    width={SubTitleTypes.SIZE_SMALL}
                    message={legendPhotoDeliveredDone}
                  />
                  <File file={image} handleImage={handleImageFile} placeholder={legendInputAddPic} />
                </div>
              </>
            ) : (
              <Input
                placeholder="Comentário sobre a não entrega"
                inputType={inputTypes.TEXT}
                value={comment}
                isRequired={true}
                handleOnChange={setComment}
              />
            )}
          </div>
        </div>

        <div className="footer-donation-received-current-prof">
          <Button size={ButtonTypes.LARGE} message={confirm} disable={disableButton} />
        </div>
      </form>
    </>
  )
}
ReceivedCurrentProfPage.propTypes = {
  store: PropTypes.shape({
    donation: PropTypes.shape({
      received: PropTypes.shape({
        date: PropTypes.string,
        amount: PropTypes.number,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(ReceivedCurrentProfPage)
