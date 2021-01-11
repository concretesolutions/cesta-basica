import { S3 } from 'aws-sdk'
import config from '../../config'

export function upload (Key, Body) {
  return new S3().upload({
    Bucket: config.app.bucketName,
    Key,
    Body
  }).promise()
}

export function remove (Key) {
  return new S3().deleteObject({
    Bucket: config.app.bucketName,
    Key
  }).promise()
}

export function signInUrl (Key) {
  return new S3().getSignedUrl('getObject', {
    Bucket: config.app.bucketName,
    Key,
    Expires: config.app.expires
  })
}
