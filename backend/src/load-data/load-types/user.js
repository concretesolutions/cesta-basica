import { connect, disconnect } from '../../core/database'
import { User } from '../../repositories'
import { config } from 'dotenv'
import { genericProcess } from '../genericProcess'
import { encrypt } from '../../services'

export async function process () {
  return genericProcess(User, 'user-data.csv', 'login', row => {
    return {
      login: row.cpf,
      password: encrypt(row.password),
      name: row.name,
      role: 'leader',
      email: row.email,
      cpf: row.cpf,
      rg: row.rg,
      phone: row.phone,
      birthdate: row.birthdate,
      siteId: row.siteId,
      deliveryLocation: row.deliveryLocation,
      deliveryCep: row.deliveryCep,
      slums: row.slums,
      userType: row.userType
    }
  })
}

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()
      await process()
      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
