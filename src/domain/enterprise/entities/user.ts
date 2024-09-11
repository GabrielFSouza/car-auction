import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { IUserProps } from './interfaces/IUserProps'

export class User extends Entity<IUserProps> {
  static create(props: IUserProps, id?: UniqueEntityID) {
    const user = new User(props, id)

    return user
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }
}
