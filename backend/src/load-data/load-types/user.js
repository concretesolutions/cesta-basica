import { connect, disconnect } from '../../core/database'
import { random } from '../../services'
import { User } from '../../repositories'
import { config } from 'dotenv'
import { genericProcess } from '../genericProcess'

export async function process () {
  return genericProcess(User, 'user-data.csv', row => {
    return {
      login: row.cpf,
      name: row.name,
      password: random.password(),
      role: 'leader',
      email: row.email,
      cpf: row.cpf,
      rg: row.rg,
      phone: row.phone,
      birthdate: row.birthdate,
      site: row.site,
      city: row.city,
      state: row.state
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
