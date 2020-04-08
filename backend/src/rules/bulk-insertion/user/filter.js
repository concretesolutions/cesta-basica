import { encrypt } from '../../../services'
import HttpException from '../../../core/http-exception'
import { CPF_REGEX, SITE_ID_REGEX } from '../filter-util'

const forEachFunc = (
  [
    lineNumber,
    [
      password, siteId, name, cpf, rg, phone, email,
      birthdate, deliveryLocation, deliveryCep, slums, userType
    ]
  ],
  sucess,
  erros
) => {
  // VALIDAR DADOS DOS CAMPOS DE ENTRADA AQUI

  if (!CPF_REGEX.test(cpf) || !SITE_ID_REGEX.test(siteId)) {
    return erros.push(parseInt(lineNumber, 10) + 1)
  }

  // Se existirem erros, nem perde mais tempo processando dados que serão descartados
  if (erros.length === 0) {
    return sucess.push({
      password: encrypt(password),
      siteId: parseInt(siteId, 10),
      name,
      rg,
      phone,
      email,
      birthdate,
      deliveryLocation,
      deliveryCep,
      slums,
      userType,
      role: 'leader',
      login: cpf
    })
  }
}

export default async (data) => {
  const invalid = []
  const valid = []
  Object.entries(data).forEach((line) => forEachFunc(line, valid, invalid))
  if (invalid.length > 0) {
    throw new HttpException(422, `Dado(s) inconsistente(s) na(s) linha(s) ${invalid.join(', ')}`)
  }
  return valid
}
