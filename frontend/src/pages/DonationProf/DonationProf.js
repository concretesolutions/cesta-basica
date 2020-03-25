import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from '../../store'
import { Title } from '../../components/Title'
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

import './DonationProf.scss'

import {
  confirm,
  back,
  titleDonationProf,
  legendInputAmountDonation,
  legendPicDonation,
  legendInputAddPic,
  legendPicFiscalNode,
} from '../../utils/strings'
import { handleBackButton } from '../../services/handles'

function DonationPage({ store, dispatch }) {
  const [numberDonation, setNumberDonation] = useState('')
  return (
    <div className="container-donation-prof">
      <div className="sidebar-donation-prof">
        <ButtonIcon handleClick={handleBackButton}>
          <LogoBack height={10} />
        </ButtonIcon>
        <Legend type={LegendTypes.STRONG} message={back} />
      </div>
      <div className="header-donation-prof">
        <Title message={`${titleDonationProf}`} />
        <Paragraph size={ParagraphTypes.MEDIUM} content="descriptionDonationProf" />
        <Input
          ignoreValidate
          inputType={inputTypes.TEXT}
          size={inputTypes.SIZE_LARGE}
          handleOnChange={setNumberDonation}
          value={numberDonation}
          placeholder={legendInputAmountDonation}
        />
      </div>
      <div className="details-donation-prof" />
      <div className="main-donation-prof">
        <SubTitle type={SubTitleTypes.MEDIUM} width={SubTitleTypes.SIZE_SMALL} message={legendPicDonation} />
        <File placeholder={legendInputAddPic} />
      </div>
      <div className="main-donation-prof">
        <SubTitle type={SubTitleTypes.MEDIUM} width={SubTitleTypes.SIZE_SMALL} message={legendPicFiscalNode} />
        <File placeholder={legendInputAddPic} />
      </div>

      <div className="footer-donation-prof">
        <Button size={ButtonTypes.LARGE} message={confirm} />
      </div>
    </div>
  )
}
DonationPage.propTypes = {
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

export default connect(DonationPage)
