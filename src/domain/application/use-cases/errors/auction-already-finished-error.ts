import { UseCaseError } from '@/core/errors/use-case-error'

export class AuctionAlreadyFinishedError extends Error implements UseCaseError {
  constructor() {
    super('Auction already finished')
  }
}
