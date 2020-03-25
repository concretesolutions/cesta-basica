import { Router } from 'express'
import { healthCheck, signin, createUser, donate, receive, commitment, checklist, listDonations } from '../rules'
import { authRequired } from '../middlewares'

export const router = Router()

router.get('/health-check', (req, res) => res.status(200).json(healthCheck()))

router.post('/users', authRequired('admin'), (req, res) => createUser(req.body)
  .then(user => res.status(201).json(user))
  .catch(err => {
    console.log(err)
    err.name === 'ValidationError'
      ? res.status(400).json({ message: err.message })
      : res.status(500).json({ message: 'Internal' })
  }))

router.post('/sign-in', (req, res) =>
  signin(req.body)
    .then(signinData => res.status(200).json(signinData))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// entregar p/ familia
router.post('/donations/:donationId/donate', authRequired('leader'), (req, res) =>
  donate(req.body, req.file)
    .then(donationData => res.status(200).json(donationData))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

router.post('/admin/sign-in', (req, res) =>
  signin(req.body)
    .then(signinData => res.status(200).json(signinData))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// recebimento de doacoes do lider
router.post('/donations/:donationId/receive', authRequired('leader'), (req, res) =>
  receive(req.body, req.file)
    .then(donationData => res.status(200).json(donationData))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// listar doações
router.get('/donations', authRequired('leader'), (req, res) =>
  listDonations(req.auth.login)
    .then(data => res.status(data.donations.length === 0 ? 404 : 200).json(data))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

router.post('/commitment', authRequired('leader'), (req, res) =>
  commitment(req.body)
    .then(() => res.status(201).end())
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

router.post('/checklist', authRequired('leader'), (req, res) =>
  checklist(req.body)
    .then(() => res.status(201).end())
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))
