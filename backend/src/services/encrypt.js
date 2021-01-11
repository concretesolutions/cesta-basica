import { createCipheriv } from 'crypto'
import { Buffer } from 'buffer'
import config from '../../config'

const { app: { algorithm, input, output } } = config

export function encrypt (value) {
  const key = config.app.encryptIv
  const encryptiv = config.app.encryptKey
  const iv = Buffer.from(encryptiv)
  const cipher = createCipheriv(algorithm, key, iv)
  let crypted = cipher.update(value, input, output)
  crypted += cipher.final(output)
  return `${iv.toString(output)}:${crypted.toString()}`
}
