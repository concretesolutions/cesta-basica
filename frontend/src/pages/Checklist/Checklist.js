import React from 'react'
import PropTypes from 'prop-types'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { SubTitle, SubTitleTypes } from '../../components/SubTitle'
import { Button, ButtonTypes } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { Symptoms } from '../../components/Symptoms'
import './Checklist.scss'

import { declareChecklist, descriptionChecklist, cancel, singin, titleChecklist } from '../../utils/strings'
import { handleCheckedHealth } from '../../services/handles'

function ChecklistPage({ store, dispatch }) {
  return (
    <div className="container-checklist">
      <div className="header-checklist">
        <Title message={titleChecklist} />
        <SubTitle type={SubTitleTypes.NORMAL} message={descriptionChecklist} />
      </div>
      <div className="main-checklist">
        <Symptoms />
        <Checkbox
          handleChecked={() => handleCheckedHealth(store, dispatch)}
          checked={store.health}
          message={declareChecklist}
        />
      </div>
      <div className="footer-checklist">
        <Button type={ButtonTypes.OUTLINE} message={cancel} />
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
