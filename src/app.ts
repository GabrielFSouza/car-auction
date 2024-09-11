import express, { Request, Response } from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { router } from './infra/http/routes'
import swaggerFile from '../swagger.json'

export const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.get('/health', (request: Request, response: Response) => {
  response.send('App is running!')
})

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))
