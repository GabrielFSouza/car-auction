import { Either } from '@/core/either'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { User } from '@/domain/enterprise/entities/user'

export interface ICreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export type ICreateUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>
