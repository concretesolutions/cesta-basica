import { Donation, Voucher } from '../repositories'
import AWS from 'aws-sdk'

export async function donate ({
  login,
  donationId,
  voucherId,
  lat,
  lon,
  delivered,
  receivedCpf,
  receivedName,
  receivedContactNumber,
  leaderComment,
  donateDonationFile
}) {
  console.log(arguments)

  const timestamp = new Date()

  /**
   * Validations
   */
  if (!donationId) {
    throw new Error('donationId is required')
  }

  if (!voucherId) {
    throw new Error('voucherId is required')
  }

  if (!lat) {
    throw new Error('lat is required')
  }

  if (!lon) {
    throw new Error('lon is required')
  }

  if (delivered === undefined) {
    throw new Error('delivered is required')
  }

  const donation = await Donation.findOne({ donationId: donationId })

  if (!donation) {
    throw new Error(`Could not find the Donation with id: ${donationId}`)
  }

  const voucher = await Voucher.findOne({ voucherId })

  if (!voucher) {
    throw new Error(`Could not find the Voucher with id: ${voucherId}`)
  }

  if (donation.leaderLogin !== login) {
    throw new Error('The owner of this donation is not the same of the token')
  }

  /**
   * Not delivered
   */
  if (delivered === false || delivered === 'false') {
    if (!leaderComment) {
      throw new Error('leaderComment is required')
    }
    voucher.status = 3
    voucher.leaderComment = leaderComment
    voucher.delivered = timestamp
    voucher.point = {
      type: 'Point',
      coordinates: [lon, lat]
    }

    await voucher.save()
    return
  } else if (delivered !== true && delivered !== 'true') {
    throw new Error('delivered must be a boolean value')
  }

  /**
   * More validations when delivered = true
   */
  if (!receivedName) {
    throw new Error('receivedName is required when delivered = true')
  }

  if (!receivedContactNumber) {
    throw new Error('receivedContactNumber is required when delivered = true')
  }

  if (!donateDonationFile) {
    throw new Error('donateDonationFile is required when delivered = true')
  }

  /**
   * S3 Upload
   */
  const [, ext] = donateDonationFile.mimetype.split('/')
  const key = `provas/entregas/entrega-doacao-${login}-${donationId}-${timestamp.toISOString()}.${ext}`

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: donateDonationFile.data
  }

  const s3 = new AWS.S3()

  s3.upload(params, function (err, data) {
    if (err) {
      throw err
    }
    console.log(`File uploaded successfully.Key:${key}`)
  })

  /**
   * Persisting information do mongodb
   */
  donation.status = 3
  donation.lastDelivery = timestamp

  voucher.receivedCpf = receivedCpf
  voucher.status = 2
  voucher.receivedName = receivedName
  voucher.receivedContactNumber = receivedContactNumber
  voucher.delivered = timestamp
  voucher.cardDonatedS3Key = key
  voucher.point = {
    type: 'Point',
    coordinates: [lon, lat]
  }

  console.log(donation)
  console.log(voucher)

  await donation.save()
  await voucher.save()
}
