import { Router } from 'express'
import { authenticateController } from '../controllers/authenticate-controller'

export const authenticateRoutes = Router()

authenticateRoutes.post('/sessions', authenticateController)
