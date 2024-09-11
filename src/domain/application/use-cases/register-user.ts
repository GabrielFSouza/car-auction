import { IUsersRepository } from '../repositories/users-repository'
import { HashGenerator } from '../cryptography/hash-generator'
import {
  ICreateUserUseCaseRequest,
  ICreateUserUseCaseResponse,
} from './interfaces/ICreateUserUseCase'
import { left, right } from '@/core/either'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@/domain/enterprise/entities/user'

export class RegisterUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserUseCaseRequest): Promise<ICreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
