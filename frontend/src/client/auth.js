import { Api } from '../services/API'

const route = ''

export const Auth = (data) => Api.post(route, data)
