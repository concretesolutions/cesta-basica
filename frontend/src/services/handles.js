import { types } from '../store/types'

import { checkExpiresCheckList, setExpiresCheckList } from './storage'
import { healthCheck } from './API/healthCheck'

export const handleCheckedDeclararion = (store, dispatch) => {
  dispatch({
    type: types.SET_DECLARATION,
    payload: !store.declaration,
  })
}
// refatorar esta caca
export async function handleCheckedHealth(dispatch, history) {
  const success = await healthCheck()
  if (success) {
    setExpiresCheckList()
    dispatch({ type: types.SET_HEALTHCHECK, payload: checkExpiresCheckList() })
    history.push('/donation-list')
  }
}
export const handleRedirectSymptoms = (url) => {
  window.open(url, '_blank')
}

export function handleClickCancelTerms(dispatch, history) {
  dispatch({ type: types.SET_LOGOUT })
  history.push('/')
}

export const handleDonationReceivedVoucher = (voucher) => {
  window.location.pathname += `/${voucher}/prof`
}

export const handleToggleModal = (setModal) => {
  setModal((value) => !value)
}

export const handleReloadLocation = () => {
  window.location.reload()
}