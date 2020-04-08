import HttpException from '../../core/http-exception'

export default async (validObjects, objectIdMapFunc, schema, schemaKey, schemaIdMapFunc, schemaDescription) => {
  const toBeFoundList = validObjects.map(objectIdMapFunc)

  const toBeFoundUnique = new Set(toBeFoundList)

  const existingObjects = await schema.find({ [schemaKey]: { $in: [...toBeFoundUnique] } }, [schemaKey])

  if (existingObjects.length !== toBeFoundUnique.size) {
    const found = new Set(existingObjects.map(schemaIdMapFunc))

    const notFound = new Set(Array.from(toBeFoundUnique).filter(element => !found.has(element)))

    throw new HttpException(422, `${schemaDescription}(s) não encontrado(s) no sistema ${[...notFound].join(', ')}`)
  }

  return validObjects
}
