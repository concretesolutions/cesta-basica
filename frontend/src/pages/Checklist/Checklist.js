import React from 'react'
import PropTypes from 'prop-types'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { Symptoms } from '../../components/Symptoms'
import { Legend } from '../../components/Legend'
import { Link } from '../../components/Link'

import './Checklist.scss'

import {
  declareChecklist,
  LegendChecklist,
  linkChecklist,
  descriptionChecklist,
  singin,
  titleChecklist,
} from '../../utils/strings'
import { handleCheckedHealth, handleRedirectSymptoms } from '../../services/handles'

function ChecklistPage({ store, dispatch }) {
  return (
    <div className="container-checklist">
      <div className="header-checklist">
        <Title message={titleChecklist} />
        <SubTitle type={SubTitleTypes.NORMAL} message={descriptionChecklist} />
      </div>
      <div className="main-checklist">
        <Symptoms />
        <Legend message={LegendChecklist} />
        <Link action={() => handleRedirectSymptoms('https://google.com.br')} message={linkChecklist} />
        <Checkbox
          handleChecked={() => handleCheckedHealth(store, dispatch)}
          checked={store.health}
          message={declareChecklist}
        />
      </div>
      <div className="footer-checklist">
        <Button disable={!store.health} message={singin} />
      </div>
    </div>
  )
}
ChecklistPage.propTypes = {
  store: PropTypes.shape({
    health: PropTypes.bool,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(ChecklistPage)
