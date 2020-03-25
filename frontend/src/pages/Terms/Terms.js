import React from 'react'
import PropTypes from 'prop-types'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { Terms } from '../../components/Terms'
import { Button, ButtonTypes } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import './Term.scss'

import { declareTermUse, cancel, singin, titleTerms } from '../../utils/strings'
import { handleCheckedDeclararion } from '../../services/handles'

function TermsPage({ store, dispatch }) {
  return (
    <div className="container-terms">
      <div className="header-terms">
        <Title message={titleTerms} />
      </div>
      <div className="main-terms">
        <Terms />
        <Checkbox
          handleChecked={() => handleCheckedDeclararion(store, dispatch)}
          checked={store.declaration}
          message={declareTermUse}
        />
      </div>
      <div className="footer-terms">
        <Button type={ButtonTypes.OUTLINE} message={cancel} />
        <Button disable={!store.declaration} message={singin} />
      </div>
    </div>
  )
}
TermsPage.propTypes = {
  store: PropTypes.shape({
    declaration: PropTypes.bool,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(TermsPage)
