import HttpException from '../../../core/http-exception'
import { DONATION_ID_REGEX, VOUCHER_ID_REGEX } from '../filter-util'

const forEachFunc = (
  [
    lineNumber,
    [
      voucherId, donationId
    ]
  ],
  sucess,
  erros,
  created
) => {
  // VALIDAR DADOS DOS CAMPOS DE ENTRADA AQUI

  if (!DONATION_ID_REGEX.test(donationId) || !VOUCHER_ID_REGEX.test(voucherId)) {
    return erros.push(parseInt(lineNumber, 10) + 1)
  }

  return sucess.push({
    voucherId,
    donationId,
    status: 1,
    created
  })
}

export default async (data) => {
  const invalid = []
  const valid = []
  const currentDate = new Date()
  Object.entries(data).forEach((line) => forEachFunc(line, valid, invalid, currentDate))
  if (invalid.length > 0) {
    throw new HttpException(422, `Dado(s) inconsistente(s) na(s) linha(s) ${invalid.join(', ')}`)
  }
  return valid
}
