import { Api } from './index'
import { types } from '../../store'

const route = '/sites'

export async function SiteList(dispatch) {
  try {
    const sites = (await Api.get(route)).data
    dispatch({ type: types.SET_SITE_LIST, payload: sites })
  } catch (err) {
    return 'failed'
  }
}
