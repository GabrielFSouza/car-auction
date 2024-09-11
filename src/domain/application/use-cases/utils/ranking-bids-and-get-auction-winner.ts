import { Car } from '@/domain/enterprise/entities/car'
import { Bids } from '@/domain/enterprise/entities/interfaces/ICarProps'

export class RankingsBidsAndGetAuctionWinner {
  static rankingsBidsAndGetAuctionWinner(car: Car): Bids {
    const rankingBidsByHighestValue = car.bids.sort(
      (bidA, bidB) => bidB.bid - bidA.bid,
    )

    const bidWinner = rankingBidsByHighestValue[0]

    return bidWinner
  }
}
