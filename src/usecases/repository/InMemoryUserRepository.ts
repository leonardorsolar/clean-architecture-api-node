import { UserData } from './../user-data'
import { UserRepository } from '../ports/user-repository'

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[]

  constructor (repository: UserData[]) {
    this.repository = repository
  }

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user)
    if (!exists) {
      this.repository.push(user)
    }
  }

  findUserByEmail (email: string): Promise<UserData> {
    const users = this.repository.filter((user) => {
      return user.email === email
    })
    if (users.length > 0) {
      return users[0]
    }
    return null
  }

  findAllUsers (): Promise<UserData[]> {
    throw new Error('Method not implemented.')
  }

  async exists (user: UserData): Promise<boolean> {
    if (await this.findUserByEmail(user.email) == null) {
      return false
    }
    return false
  }
}
