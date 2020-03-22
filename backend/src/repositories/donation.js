import { model, Schema } from 'mongoose'

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
})

const donationSchema = new Schema({
  donationId: {
    type: String,
    unique: true,
    required: [true, 'DonationId is required']
  },
  leaderId: {
    type: String,
    required: [true, 'LeaderId is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required']
  },
  donor: {
    type: String,
    required: [true, 'Donor is required']
  },
  status: {
    type: String,
    enum: ['Esperando recebimento', 'Entregue para líder', 'Completo', 'Devolvido', 'Extraviado'],
    required: [true, 'status is required'],
    default: 'Esperando recebimento'
  },
  s3Key: {
    type: String
  }
})

const eventSchema = new Schema({
  donationId: {
    type: String,
    unique: true,
    required: [true, 'DonationId is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required']
  },
  leaderId: {
    type: String,
    required: [true, 'LeaderId is required']
  },
  donor: {
    type: String,
    required: [true, 'Donor is required']
  },
  status: {
    type: String,
    enum: ['Esperando recebimento', 'Entregue para líder', 'Completo', 'Devolvido', 'Extraviado'],
    required: [true, 'status is required'],
    default: 'Esperando recebimento'
  },
  timeStamp: {
    type: String,
    required: [true, 'Timestamp is required']
  },
  receivedCpf: {
    String,
    required: [true, 'receivedCpf is required']
  },
  receivedName: {
    String,
    required: [true, 'receivedName is required']
  },
  location: pointSchema
})

export const Donation = model('Donation', donationSchema)
export const DonationEvent = model('DonationEvent', eventSchema)
