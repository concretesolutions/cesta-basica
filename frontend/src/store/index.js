import React, { useContext } from 'react'
import { types } from './types'

import { set, get, clear } from '../services/storage'

export { types }
const dataStorage = get()
const cleanState = {
  user: {},
  auth: {
    token: null,
  },
  donation: {
    received: {
      date: '26/03/20',
      amount: 50,
      type: 'Cesta básica',
      deadline: '27/03/2020 12h03',
    },
    gived: {
      amount: 10,
    },
  },
  declaration: false,
  health: false,
  donationList: [
    {
      id: 'fdsfdfdssd',
      status: 'Completo',
      donationId: 1,
      leaderLogin: 11,
      quantity: 150,
      donor: 'Teste do glaucio',
    },
  ],
}

function saveState(newState) {
  set(newState)
  return newState
}

function logout() {
  clear()
  return cleanState
}

export const initialState = dataStorage || cleanState

export const Context = React.createContext()

const actionMap = {
  [types.SET_USER]: (state, payload) => saveState({ ...state, user: payload }),
  [types.SET_TOKEN]: (state, { token }) => saveState({ ...state, auth: { ...state.auth, token } }),
  [types.SET_DECLARATION]: (state, payload) => saveState({ ...state, declaration: payload }),
  [types.SET_HEALTHCHECK]: (state, payload) => saveState({ ...state, health: payload }),
  [types.SET_LOGOUT]: () => logout(),
  [types.SET_DONATION]: (state, payload) => ({
    ...state,
    donation: payload,
  }),
  [types.SET_DONATION_LIST]: (state, payload) => saveState({ ...state, donationList: payload }),
}

export function reducer(state, action) {
  console.log(`Store reducer is called with action ${action.type}`)
  return actionMap[action.type] ? actionMap[action.type](state, action.payload) : state
}

export function connect(Component) {
  return function ConnectedComponent(props) {
    const { store, dispatch } = useContext(Context)
    return <Component store={store} dispatch={dispatch} {...props} />
  }
}
