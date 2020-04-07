import HttpException from '../../../core/http-exception'

const forEachFunc = (
  [
    lineNumber,
    [
      donationId, leaderLogin, name, site, city, state, quantity, scheduled,
    ]
  ],
  sucess,
  erros,
) => {
  //VALIDAR DADOS DOS CAMPOS DE ENTRADA AQUI

  //DEIXEI AQUI PARA TESTE
  // if (lineNumber === '5' || lineNumber === '10') {
  //   return erros.push(parseInt(lineNumber, 10) + 1);
  // }

  return sucess.push({
    donationId, leaderLogin, name, site, city, state, quantity, scheduled,
    status: 1,
  });
};

export default async (data) => {
  const invalid = [];
  const valid = [];
  Object.entries(data).forEach((line) => forEachFunc(line, valid, invalid));
  if (invalid.length > 0) {
    throw new HttpException(422, `Dado(s) inconsistente(s) na(s) linha(s) ${invalid.join(', ')}`);
  }
  return valid;
};
