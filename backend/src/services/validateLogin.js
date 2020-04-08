import joiCpfCnpj from 'joi-cpf-cnpj'
import Joi from 'joi'

const joiCpfCnpjValidator = Joi.extend(joiCpfCnpj)

export async function validateLogin (cpf) {
  const schema = Joi.object({
    cpf: joiCpfCnpjValidator()
  })

  const { error, value } = schema.validate({ cpf }, {
    abortEarly: false
  })

  if (error) {
    throw new Error(error.message)
  }

  return value
}
