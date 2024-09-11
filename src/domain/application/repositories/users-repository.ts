import { User } from '@/domain/enterprise/entities/user'

export interface IUsersRepository {
  create(user: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
}
