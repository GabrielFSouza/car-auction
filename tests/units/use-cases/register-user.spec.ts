import { InMemoryUsersRepository } from 'tests/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from '@/domain/application/use-cases/register-user'
import { FakeHasher } from 'tests/cryptography/fake-hasher'
import { UserAlreadyExistsError } from '@/domain/application/use-cases/errors/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to register a user', async () => {
    const result = await sut.execute({
      name: 'naming test',
      email: 'testing@test.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: 'naming test',
      email: 'testing@test.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isLeft()).toBe(false)
    expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'testing@test.com'

    await sut.execute({
      name: 'naming test',
      email,
      password: '123456',
    })

    const result = await sut.execute({
      name: 'naming test',
      email,
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
