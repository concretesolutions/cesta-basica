import { CPF_REGEX, SITE_ID_REGEX, DONATION_ID_REGEX } from '../filter-util'
import ProcFileException from '../../../core/process-file-exception'
import { fileStatus } from '../../../repositories'
import { normalizeLines } from '../../../utils'

const forEachFunc = ([lineNumber, [donationId, leaderLogin, siteId, quantity, scheduled]],
  sucess,
  erros
) => {
  // VALIDAR DADOS DOS CAMPOS DE ENTRADA AQUI

  if (!CPF_REGEX.test(leaderLogin) || !SITE_ID_REGEX.test(siteId) || !DONATION_ID_REGEX.test(donationId)) {
    return erros.push(parseInt(lineNumber, 10) + 1)
  }

  // Se existirem erros, nem perde mais tempo processando dados que serão descartados
  if (erros.length === 0) {
    return sucess.push({
      donationId,
      leaderLogin,
      siteId: parseInt(siteId, 10),
      quantity,
      scheduled,
      status: 1
    })
  }
}

export default async (data) => {
  const invalid = []
  const valid = []

  Object.entries(data).forEach((line) => forEachFunc(normalizeLines(line), valid, invalid))

  if (invalid.length > 0) {
    throw new ProcFileException(
      422,
      `Dado(s) inconsistente(s) na(s) linha(s) ${invalid.join(', ')}`,
      fileStatus.invalid
    )
  }
  return valid
}
