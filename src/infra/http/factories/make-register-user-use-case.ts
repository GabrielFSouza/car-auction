import { MongoUsersRepository } from '@/infra/database/mongo/repositories/mongo-users-repository'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { RegisterUserUseCase } from '@/domain/application/use-cases/register-user'

export function makeRegisterUserUseCase() {
  const usersRepository = new MongoUsersRepository()
  const bcryptHasher = new BcryptHasher()
  const registerUserUseCase = new RegisterUserUseCase(
    usersRepository,
    bcryptHasher,
  )

  return registerUserUseCase
}
