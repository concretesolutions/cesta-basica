const moment = require('moment')

module.exports = data => {
  const header = 'Pacote;Usuário;Nome;Quantidade;Cartões Recebidos;Cartões Entregues;Cartões Não Entregues;Entidade;Cidade;UF;Data/Hora Recebimento pelo Líder\n'
  const transformedData = `${header}\n${data.map(e => `${e.donationId};${e.leaderLogin};${e.leaderName || "Não Informado"};${e.quantity};${e.vouchers.received};${e.vouchers.delivered};${e.vouchers.notDelivered};${e.site.name};${e.site.city};${e.site.state};${parseDate(e.receivedDate)}`).join('\n')}`

  return { byteSize: Buffer.byteLength(transformedData), data: transformedData, length: data.length }
}

function parseDate(date) {
  if (!date) return ""
  return moment(date).format("DD/MM/YYYY HH:mm")
}