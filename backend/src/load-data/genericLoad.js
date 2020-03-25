function compareStringArrays (a, b) {
  return (JSON.stringify(a) === JSON.stringify(b))
}

export async function genericLoad (schema, rows) {
  if (!schema) {
    throw new Error('schema is required')
  }

  const schemaKeys = Object.keys(schema.schema.paths).filter(key => !key.startsWith('_'))

  if (rows.length === 0) {
    throw new Error('rows must contain at least one row')
  }

  const keys = Object.keys(rows[0])

  if (!compareStringArrays(schemaKeys, keys)) {
    throw new Error(`Columns names must be ${schemaKeys.join(', ')}`)
  }

  return Promise.all(rows.map(async row => schema.create(row)))
}
