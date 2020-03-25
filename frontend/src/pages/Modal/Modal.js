import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { Title } from '../../components/Title'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Paragraph } from '../../components/Paragraph'
import { Button, ButtonTypes } from '../../components/Button'
import './Modal.scss'

import { contate, contateNumber } from '../../utils/strings'

function ModalPage({ isOpenModal, title, actionExit }) {
  const customStyles = {
    overlay: {
      height: '450px',
      top: '25%',
    },
  }
  return (
    <Modal isOpen={isOpenModal} style={customStyles} contentLabel={title} onRequestClose={actionExit}>
      <Title message={title} />
      <Paragraph content="completeDeliveryThanks" />
      <Paragraph content="completeDeliveryInformationContate" />
      <SubTitle size={SubTitleTypes.MEDIUM} type={SubTitleTypes.STRONG} message={contate} />
      <SubTitle size={SubTitleTypes.MEDIUM} type={SubTitleTypes.NORMAL} message={contateNumber} />
      <Button size={ButtonTypes.LARGE} message="OK" handleClick={actionExit} />
    </Modal>
  )
}
ModalPage.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  actionExit: PropTypes.func.isRequired,
}

export default ModalPage
