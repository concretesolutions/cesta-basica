import { readFile } from './read'
import { filterFile } from './filter'
import { processFile } from './process'
import { checkFile } from './check'

export function insertDataFromFile ({ file, type }) {
  return readFile(file)
    .then(parsedData => filterFile(parsedData, type))
    .then(filteredData => checkFile(filteredData, type))
    .then(validData => processFile(validData, type))
}
