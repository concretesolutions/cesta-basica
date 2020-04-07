import CustomError from '../../core/custom-error';

export default async (validObjects, objectIdMapFunc, schema, schemaKey, schemaIdMapFunc, schemaDescription) => {
  const toBeFoundList = validObjects.map(objectIdMapFunc);

  const toBeFoundUnique = new Set(toBeFoundList);

  const existingObjects = await schema.find({ [schemaKey]: { $in: [...toBeFoundUnique] } }, [schemaKey]);

  if (existingObjects.length !== toBeFoundUnique.size) {
    const found = new Set(existingObjects.map(schemaIdMapFunc));

    const notFound = new Set();

    [...toBeFoundUnique].forEach(element => {
      if (!found.has(element)) {
        notFound.add(element);
      }
    });

    throw new CustomError(422, `${schemaDescription}(s) não encontrado(s) no sistema ${[...notFound].join(', ')}`)
  }

  return validObjects;
}
