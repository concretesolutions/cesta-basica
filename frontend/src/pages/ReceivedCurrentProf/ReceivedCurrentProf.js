import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { Items, ItemsTypes } from '../../components/Items'
import { LogoBack } from '../../components/Logo'
import { Input, inputTypes } from '../../components/Input'
import { File, FileTypes } from '../../components/File'
import { Status } from '../../components/Status'
import { Sidebar } from '../../components/Sidebar'
import { Legend, LegendTypes } from '../../components/Legend'
import { Paragraph, ParagraphTypes } from '../../components/Paragraph'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Button, ButtonTypes } from '../../components/Button'
import { ButtonIcon, ButtonIconTypes } from '../../components/ButtonIcon'

import './ReceivedCurrentProf.scss'

import {
  confirm,
  back,
  titleDonationProf,
  legendAddPicPersonReceivedDonation,
  legendAddPicPersonReceivedDonationWithDocument,
  legendPicDonation,
  legendInputAddPic,
  legendPicFiscalNode,
} from '../../utils/strings'
import { handleBackCurrentReceivedButton } from '../../services/handles'

function ReceivedCurrentProfPage({ store, dispatch }) {
  const { voucher } = useParams()
  return (
    <div className="container-donation-received-current-prof">
      <div className="sidebar-donation-received-current-prof">
        <ButtonIcon handleClick={handleBackCurrentReceivedButton}>
          <LogoBack height={10} />
        </ButtonIcon>
        <Legend type={LegendTypes.STRONG} message={back} />
      </div>
      <div className="header-donation-received-current-prof">
        <Title message={`${titleDonationProf}`} />
        <Paragraph size={ParagraphTypes.MEDIUM} content="descriptionDonationProf" />
        <Items size={ItemsTypes.LARGE} align={ItemsTypes.START} title={`Cesta ${voucher}`} />
        <Items size={ItemsTypes.LARGE} type={ItemsTypes.SELECT} align={ItemsTypes.START} title={`Cesta ${voucher}`} />
      </div>
      <div className="details-donation-received-current-prof" />
      <div className="main-donation-received-current-prof">
        <Legend size={LegendTypes.SIZE_LARGE} message={legendAddPicPersonReceivedDonation} />
        <SubTitle type={SubTitleTypes.MEDIUM} width={SubTitleTypes.SIZE_SMALL} message={legendPicDonation} />
        <File placeholder={legendInputAddPic} />
      </div>
      <div className="main-donation-received-current-prof">
        <Legend size={LegendTypes.SIZE_LARGE} message={legendAddPicPersonReceivedDonationWithDocument} />
        <SubTitle type={SubTitleTypes.MEDIUM} width={SubTitleTypes.SIZE_SMALL} message={legendPicFiscalNode} />
        <File placeholder={legendInputAddPic} />
      </div>

      <div className="footer-donation-received-current-prof">
        <Button size={ButtonTypes.LARGE} message={confirm} />
      </div>
    </div>
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
