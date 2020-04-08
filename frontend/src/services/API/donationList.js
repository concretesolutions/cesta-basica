import { Api } from './index'
import { types } from '../../store'
import { compressImageFile } from '../../utils/compressFile'

const route = '/donations'
const routeDonationEnd = (id) => `/donations/${id}/end`

export async function DonationsList(dispatch) {
  try {
    const { donations } = (await Api.get(route)).data
    dispatch({ type: types.SET_DONATION_LIST, payload: donations })
  } catch (err) {
    return 'failed'
  }
}

export async function DonationVoucher(dataScreen, store) {
  const { id, voucher, delivered, CPF, fullName, image } = dataScreen
  const { lat, lon } = store.userLocation

  const compressedFile = image ? await compressImageFile(image) : image

  const formData = new FormData()
  formData.append('voucherId', voucher)
  formData.append('lat', lat)
  formData.append('lon', lon)
  formData.append('delivered', delivered)
  formData.append('receivedCpf', CPF)
  formData.append('receivedName', fullName)
  formData.append('donateDonationFile', compressedFile)
  try {
    await Api.post(`donations/${id}/donate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return true
  } catch (error) {
    return false
  }
}

export async function EndDonation(id, nextPage) {
  try {
    await Api.post(routeDonationEnd(id))
    nextPage()
  } catch (err) {
    return 'failed'
  }
}

export async function DonationDetails(dispatch, id) {
  try {
    const response = (await Api.get(`${route}/${id}/details`, { params: { id } })).data
    dispatch({ type: types.SET_DONATION_DETAILS, payload: response })
  } catch (err) {
    return 'failed'
  }
}
