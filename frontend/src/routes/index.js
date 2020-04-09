import React from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'

import Route from './routeWrapper'

import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Terms } from '../pages/Terms'
import { Checklist } from '../pages/Checklist'

import { DonationList } from '../pages/DonationList'
import { Donation } from '../pages/Donation'
import { DonationProf } from '../pages/DonationProf'
import { Received } from '../pages/Received'
import { ReceivedCurrent } from '../pages/ReceivedCurrent'
import { ReceivedCurrentProf } from '../pages/ReceivedCurrentProf'
import { DonationDetails } from '../pages/DonationDetails'
import { DeliveredDetail } from '../pages/DeliveredDetail'

import { Charge } from '../pages/Charge'
import { DonationRegister } from '../pages/DonationRegister'

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/terms" exact component={Terms} isPrivate />
      <Route path="/checklist" exact component={Checklist} isPrivate />
      <Route path="/donation-list" exact component={DonationList} isPrivate />
      <Route path="/donation/:id/wait" exact component={Donation} isPrivate />
      <Route path="/donation/:id/wait/prof" exact component={DonationProf} isPrivate />
      <Route path="/donation/:id/received" exact component={Received} isPrivate />
      <Route path="/donation/:id/received/current" exact component={ReceivedCurrent} isPrivate />
      <Route path="/donation/:id/received/current/:voucher/prof" exact component={ReceivedCurrentProf} isPrivate />
      <Route path="/donation/:id/details" exact component={DonationDetails} isPrivate />
      <Route path="/charge" component={Charge} isPrivate />
      <Route path="/donation/:id/delivered-details/:voucher" exact component={DeliveredDetail} isPrivate />
      <Route path="/donation/register" exact component={DonationRegister} isPrivate />
    </Switch>
  </BrowserRouter>
)
