import { Donation, DonationEvent } from '../repositories/donation'

var AWS = require('aws-sdk')
const BUCKET_NAME = 'cesta-basica-sp'

export async function receive ({ donationId, leaderId, geolocation, quantity, receivedCpf, receivedName, fileContent }) {
  const donation = await Donation.findOne({ donationId: donationId })

  console.log(donation)

  if (donation) {
    donation.status = donation.status[1]
    await donation.save()

    var utcNow = new Date()
    var key = `/provas/recebimentos/entrega-${donationId}-${utcNow.toISOString()}.jpg`

    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileContent
    }

    var s3 = new AWS.S3()
    s3.upload(params, function (err, data) {
      if (err) {
        throw err
      }
      console.log(`File uploaded successfully.Key:${key}`)
    })

    var event = new DonationEvent({
      donationId: donationId,
      quantity: quantity,
      leaderId: leaderId,
      status: donation.status,
      donor: donation.donor,
      receivedCpf: receivedCpf,
      receivedName: receivedName,
      timeStamp: utcNow.toISOString(),
      location: geolocation,
      s3Key: key
    })

    console.log(event)

    await event.save()

    return {
      donation: donation
    }
  }

  return Promise.reject(new Error(`Donation ${donationId} save failed.`))
}
