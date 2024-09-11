import { InMemoryUsersRepository } from 'tests/repositories/in-memory-users-repository'
import { FakeHasher } from 'tests/cryptography/fake-hasher'
import { AuthenticateUseCase } from '@/domain/application/use-cases/authenticate'
import { makeUser } from 'tests/factories/make-user'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    sut = new AuthenticateUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to authenticate', async () => {
    const email = 'testing@test.com'
    const password = '123456'

    const user = makeUser({
      email,
      password: await fakeHasher.hash('123456'),
    })

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      email,
      password,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
  })

  it('should not be able to authenticate with wrong email', async () => {
    const password = '123456'

    const user = makeUser({
      email: 'testing@test.com',
      password,
    })

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      email: 'newemail@test.com',
      password,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'testing@test.com'

    const user = makeUser({
      email,
      password: '123456',
    })

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      email,
      password: 'incorrect password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
