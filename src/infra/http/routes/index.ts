import { Router } from 'express'
import { userRoutes } from './users.routes'
import { authenticateRoutes } from './authenticate.routes'
import { carRoutes } from './cars.routes'

export const router = Router()

router.use('/users', userRoutes)
router.use('/cars', carRoutes)
router.use(authenticateRoutes)
