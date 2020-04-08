import csvtojson from 'csvtojson'

export async function readFile (file) {
  const csvData = file.data.toString('utf8')

  return csvtojson({
    output: 'csv',
    trim: true,
    delimiter: process.env.FILE_DELIMITER || ',' // Delimitador do arquivo
  }).fromString(csvData)
}
