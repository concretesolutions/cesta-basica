import HttpException from '../../../core/http-exception'

const forEachFunc = (
  [
    lineNumber,
    [
      voucherId, donationId, leaderLogin,
    ]
  ],
  sucess,
  erros,
  created,
) => {
  //VALIDAR DADOS DOS CAMPOS DE ENTRADA AQUI

  //DEIXEI AQUI PARA TESTE
  // if (lineNumber === '5' || lineNumber === '10') {
  //   return erros.push(parseInt(lineNumber, 10) + 1);
  // }

  return sucess.push({
    voucherId, donationId, leaderLogin,
    status: 1, created,
  });
};

export default async (data) => {
  const invalid = [];
  const valid = [];
  const currentDate = new Date()
  Object.entries(data).forEach((line) => forEachFunc(line, valid, invalid, currentDate));
  if (invalid.length > 0) {
    throw new HttpException(422, `Dado(s) inconsistente(s) na(s) linha(s) ${invalid.join(', ')}`);
  }
  return valid;
};
