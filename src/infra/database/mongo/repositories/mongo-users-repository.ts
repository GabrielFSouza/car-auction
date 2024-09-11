import { Collection } from 'mongodb'
import { IUsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user'
import { env } from '@/core/env'
import { MongoService } from '../mongo-service'
import { IUserProps } from '@/domain/enterprise/entities/interfaces/IUserProps'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class MongoUsersRepository implements IUsersRepository {
  private usersCollection: Collection<IUserProps>

  private mongo: MongoService

  constructor() {
    const { USERS_COLLECTION } = env

    this.mongo = MongoService.getInstance()

    this.usersCollection =
      this.mongo.databaseInstance.collection<IUserProps>(USERS_COLLECTION)
    this.usersCollection.createIndex({ email: 1 }, { unique: true })
  }

  async create(user: User): Promise<void> {
    await this.usersCollection.insertOne({
      name: user.name,
      email: user.email,
      password: user.password,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const dbUser = await this.usersCollection.findOne({ email })

    if (!dbUser) {
      return null
    }

    const id = new UniqueEntityID(dbUser._id.toString())

    const user = User.create(dbUser, id)

    return user
  }
}
