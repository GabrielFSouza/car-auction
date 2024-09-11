import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Bids, ICarProps } from './interfaces/ICarProps'
import { Optional } from '@/core/types/optional'

export class Car extends Entity<ICarProps> {
  static create(
    props: Optional<ICarProps, 'createdAt' | 'isAuctionFinished' | 'bids'>,
    id?: UniqueEntityID,
  ) {
    const car = new Car(
      {
        ...props,
        isAuctionFinished: props.isAuctionFinished ?? false,
        createdAt: props.createdAt ?? new Date(),
        bids: props.bids ?? [],
      },
      id,
    )

    return car
  }

  get name() {
    return this.props.name
  }

  get licensePlate() {
    return this.props.licensePlate
  }

  get year() {
    return this.props.year
  }

  get brand() {
    return this.props.brand
  }

  get category() {
    return this.props.category
  }

  get specifications() {
    return this.props.specifications
  }

  get initialBid() {
    return this.props.initialBid
  }

  get isAuctionFinished() {
    return this.props.isAuctionFinished
  }

  set isAuctionFinished(isAuctionFinished: boolean) {
    this.props.isAuctionFinished = isAuctionFinished
    this.touch()
  }

  get bids() {
    return this.props.bids
  }

  set bids(bids: Bids[]) {
    this.props.bids = bids
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
