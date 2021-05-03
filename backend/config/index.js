import 'dotenv/config'

export default {
  app: {
    port: process.env.PORT,
    secret: process.env.SECRET,
    encryptKey: process.env.ENCRYPTKEY,
    encryptIv: process.env.ENCRYPTIV,
    fileDelimiter: process.env.FILE_DELIMITER,
    bucketName: process.env.BUCKET_NAME,
    bucketAcl: process.env.BUCKET_ACL,
    expires: +process.env.EXPIRES,
    algorithm: process.env.ALGORITHM,
    input: process.env.INPUT,
    output: process.env.OUTPUT
  },
  db: {
    url: process.env.DBURL,
    mongooseDebug: process.env.MONGOOSE_DEBUG
  }
}
