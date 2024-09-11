import { AuthenticateUseCase } from '@/domain/application/use-cases/authenticate'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { MongoUsersRepository } from '@/infra/database/mongo/repositories/mongo-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new MongoUsersRepository()
  const bcryptComparer = new BcryptHasher()
  const authenticateUseCase = new AuthenticateUseCase(
    usersRepository,
    bcryptComparer,
  )

  return authenticateUseCase
}
