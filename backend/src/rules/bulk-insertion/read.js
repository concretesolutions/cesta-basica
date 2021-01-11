import csvtojson from 'csvtojson'
import config from '../../../config'

export async function readFile (file) {
  const csvData = file.data.toString('utf8')

  return csvtojson({
    output: 'csv',
    trim: true,
    delimiter: config.app.fileDelimiter || ',' // Delimitador do arquivo
  }).fromString(csvData)
}
