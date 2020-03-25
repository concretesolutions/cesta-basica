import { Parser } from 'json2csv'
import { genericLoad } from './genericLoad'
import csvtojson from 'csvtojson'
import yaml from 'js-yaml'
import path from 'path'
import fs from 'fs'

export async function genericProcess (schema, csvName, csvMap) {
  try {
    const csvPath = path.resolve('data-to-load', csvName)

    // eslint-disable-next-line node/no-deprecated-api
    if (!fs.existsSync(csvPath)) {
      throw new Error(`The data must on /data-to-load/${csvName}`)
    }

    const rows = (await csvtojson().fromFile(csvPath)).map(csvMap)

    await genericLoad(schema, rows)

    fs.writeFileSync(`${csvPath}.results.json`, JSON.stringify(rows, null, 2))
    fs.writeFileSync(`${csvPath}.results.csv`, (new Parser()).parse(rows))
    fs.writeFileSync(`${csvPath}.results.yml`, yaml.dump(rows))
  } catch (err) {
    console.error(err)
  }
}
