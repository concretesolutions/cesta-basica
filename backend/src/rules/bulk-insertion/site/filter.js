import ProcFileException from '../../../core/process-file-exception'
import { fileStatus } from '../../../repositories'
import { SITE_ID_REGEX } from '../filter-util'
import { normalizeLines } from '../../../utils'

const forEachFunc = (
  [
    lineNumber,
    [
      siteId, name, city, state
    ]
  ],
  sucess,
  erros
) => {
  // VALIDAR DADOS DOS CAMPOS DE ENTRADA AQUI

  if (!SITE_ID_REGEX.test(siteId)) {
    return erros.push(parseInt(lineNumber, 10) + 1)
  }

  // Se existirem erros, nem perde mais tempo processando dados que serão descartados
  if (erros.length === 0) {
    return sucess.push({
      siteId: parseInt(siteId, 10),
      name,
      city,
      state
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
