import jwt from 'jsonwebtoken'
import config from '../../config'

const UNAUTHORIZED_MESSAGE = 'Unauthorized request, check your credentials.'
const FORBIDDEN_MESSAGE = 'Forbidden'

export function authRequired (...roles) {
  return async function (req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) return res.status(401).send({ auth: false, message: UNAUTHORIZED_MESSAGE })

    jwt.verify(token, config.app.secret, function (err, auth) {
      if (err) {
        console.log('Error on verify token', err)
        return res.status(401).send({ auth: false, message: UNAUTHORIZED_MESSAGE })
      }

      if (roles.length > 0 && !roles.includes(auth.role)) {
        return res.status(403).send({ auth: true, message: FORBIDDEN_MESSAGE })
      }

      req.auth = auth
      next()
    })
  }
}
