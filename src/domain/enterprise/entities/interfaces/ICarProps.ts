export interface Bids {
  userEmail: string
  bid: number
}

export interface ICarProps {
  name: string
  licensePlate: string
  year: number
  brand: string
  category: string
  specifications: string
  initialBid: number
  isAuctionFinished: boolean
  bids: Bids[] | []
  createdAt: Date
  updatedAt?: Date | null
}
