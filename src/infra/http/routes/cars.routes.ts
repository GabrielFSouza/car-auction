import { Router } from 'express'
import { verifyJwt } from '../middlewares/verifyJwt'
import { registerCarController } from '../controllers/register-car-controller'
import { registerBidController } from '../controllers/register-bid-controller'
import { getCarAuctionController } from '../controllers/get-car-auction-controller'
import { closeAuctionController } from '../controllers/close-auction-controller'

export const carRoutes = Router()

carRoutes.post('/', verifyJwt, registerCarController)
carRoutes.post('/bid/:licensePlate', verifyJwt, registerBidController)
carRoutes.get('/car-auction/:licensePlate', verifyJwt, getCarAuctionController)
carRoutes.patch(
  '/close-auction/:licensePlate',
  verifyJwt,
  closeAuctionController,
)
