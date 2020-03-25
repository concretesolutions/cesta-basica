import { Api } from './API'
import { types } from '../store'

const route = '/sign-in'

const mock = {
  data: {
    user: {
      id: 'lorem',
      login: 'glaucio ricardo',
      role: 'admin',
    },
    token: '_ihfusdhfbsdh.fjksdnfdsjf',
  },
}

export async function Auth(dataRequest, dispatch, history) {
  try {
    const response = mock || await Api.post(route, dataRequest)
    const { user, token } = response.data
    dispatch({ type: types.SET_USER, payload: user })
    dispatch({ type: types.SET_TOKEN, payload: { token } })
    // trocar quando tiver roles
    history.push('/donation-list')
  } catch (err) {
    return undefined
  }
}
