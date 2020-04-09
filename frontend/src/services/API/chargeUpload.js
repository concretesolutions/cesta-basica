import { Api } from './index'

export async function ChargeUpload({ file, type }) {

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await Api.post(`load/${type}`, formData, { headers: {
      'Content-Type': 'multipart/form-data',
    }})

    return response
  } catch (err) {
    return err.response
  }
}
