import React from 'react'

import { Route, Switch, useLocation, useRouteMatch, useHistory } from 'react-router-dom'

import { Legend, LegendTypes } from '../../../components/Legend'
import { BottomMenu } from '../../../components/BottomMenu'
import { ChargeHeader } from '../ChargeList/CommonComponents/ChargeHeader'

import { ChargeAdd } from '../ChargeAdd'
import { ChargeList } from '../ChargeList'

import { ButtonIcon } from '../../../components/ButtonIcon'
import { LogoBack } from '../../../components/Logo'

import { back, chargeTitlePage } from '../../../utils/strings'

import './Charge.scss'

export const Charge = () => {
  const history = useHistory()
  const { goBack } = history
  const location = useLocation()
  const { pathname, state } = location
  const { path } = useRouteMatch()

  return (
    <div className="chargeList">
      {state && (
        <div className="backContainer">
          <ButtonIcon handleClick={goBack}>
            <LogoBack height={10} />
          </ButtonIcon>
          <Legend type={LegendTypes.STRONG} message={back} />
        </div>
      )}

      <ChargeHeader title={state ? state.title : chargeTitlePage} />

      <Switch>
        <Route path={path} exact component={ChargeList} />
        <Route path="/charge/add" component={ChargeAdd} />
      </Switch>

      {pathname === '/charge' && <BottomMenu isAdmin />}
    </div>
  )
}
