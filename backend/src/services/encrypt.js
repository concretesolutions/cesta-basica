import { createCipheriv } from 'crypto'
import { Buffer } from 'buffer'
import config from '../../config'

const { app: { algorithm, input, output, encryptKey, encryptIv } } = config

export function encrypt (value) {
  const iv = Buffer.from(encryptIv)
  const cipher = createCipheriv(algorithm, encryptKey, iv)
  let crypted = cipher.update(value, input, output)
  crypted += cipher.final(output)
  return `${iv.toString(output)}:${crypted.toString()}`
}
