import express from 'express'
import fileUpload from 'express-fileupload'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { genericErrorHanlder } from '../middlewares'
import { router } from './router'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({ createParentPath: true }))
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(router)
app.use(genericErrorHanlder)

export const start = () =>
  new Promise(resolve => app.listen(process.env.PORT, () => resolve(app)))
