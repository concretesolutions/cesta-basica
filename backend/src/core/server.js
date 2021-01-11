import express from 'express'
import serveless from 'serverless-http'
import fileUpload from 'express-fileupload'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import config from '../../config'
import { genericErrorHanlder } from '../middlewares'
import { router } from './router'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({ createParentPath: true }))
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(router)
app.use(genericErrorHanlder)

const start = () =>
  new Promise(resolve => app.listen(config.app.port, () => resolve(app)))

const handler = serveless(app)

export { start, handler }
