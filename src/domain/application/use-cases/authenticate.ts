import { left, right } from '@/core/either'
import { IUsersRepository } from '../repositories/users-repository'
import {
  IAuthenticateUseCaseRequest,
  IAuthenticateUseCaseResponse,
} from './interfaces/IAuthenticateUserUseCase'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { HashComparer } from '../cryptography/hash-comparer'

export class AuthenticateUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashComparer: HashComparer,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    return right({
      user,
    })
  }
}
