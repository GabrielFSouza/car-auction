import { Either } from '@/core/either'
import { WrongCredentialsError } from '../errors/wrong-credentials-error'
import { User } from '@/domain/enterprise/entities/user'

export interface IAuthenticateUseCaseRequest {
  email: string
  password: string
}

export type IAuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  {
    user: User
  }
>
