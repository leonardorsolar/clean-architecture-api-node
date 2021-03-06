import { UserData } from '../../entities'
import { UserRepository } from '../register-user-on-maling-list/ports'

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

  async findUserByEmail (email: string): Promise<UserData> {
    const found = this.repository.find(user => user.email === email)
    return found || null
  }

  async findAllUsers (): Promise<UserData[]> {
    throw new Error('Method not implemented.')
  }

  async exists (user: UserData): Promise<boolean> {
    if (await this.findUserByEmail(user.email) == null) {
      return false
    }
    return false
  }
}
