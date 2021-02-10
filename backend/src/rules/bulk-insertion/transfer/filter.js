import ProcFileException from '../../../core/process-file-exception'
import { CPF_REGEX, DONATION_ID_REGEX } from '../filter-util'
import { fileStatus } from '../../../repositories'
import { normalizeLines } from '../../../utils'

const forEachFunc = (
  [
    lineNumber,
    [
      donationId, leaderLogin
    ]
  ],
  sucess,
  erros
) => {
  // VALIDAR DADOS DOS CAMPOS DE ENTRADA AQUI

  if (!CPF_REGEX.test(leaderLogin) || !DONATION_ID_REGEX.test(donationId)) {
    return erros.push(parseInt(lineNumber, 10) + 1)
  }

  return sucess.push({
    donationId,
    leaderLogin
  })
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
