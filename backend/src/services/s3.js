import AWS from 'aws-sdk'
import config from '../../config'

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
})

export function upload (Key, Body) {
  return s3.upload({
    Bucket: config.app.bucketName,
    Key,
    Body
  }).promise()
}

export function remove (Key) {
  return s3.deleteObject({
    Bucket: config.app.bucketName,
    Key
  }).promise()
}

export function signInUrl (Key) {
  return s3.getSignedUrl('getObject', {
    Bucket: config.app.bucketName,
    Key,
    Expires: config.app.expires
  })
}
