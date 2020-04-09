import { Api } from './index'
import { types } from '../../store'

const route = '/leaders'

export async function LeadersList(dispatch, name) {
  try {
    const leaders = (await Api.get(route, { params: { name } })).data
    dispatch({ type: types.SET_LEADER_LIST, payload: leaders })
  } catch (err) {
    return 'failed'
  }
}
