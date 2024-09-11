import { Router } from 'express'
import { registerUserController } from '../controllers/register-user-controller'

export const userRoutes = Router()

userRoutes.post('/', registerUserController)
