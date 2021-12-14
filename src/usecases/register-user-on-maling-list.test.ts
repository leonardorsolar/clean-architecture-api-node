import { InvalidEmailError } from '../entities/errors/invalid-email-error'
import { UserData } from '../entities/user-data'
import { left } from '../share/either'
import { UserRepository } from './ports/user-repository'
import { RegisterUserOnMainlingList } from './register-user-on-mailing-list'
import { InMemoryUserRepository } from './repository/InMemoryUserRepository'

describe('Register user on maling list use case', () => {
  test('should add user with complete data to mailing list ', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMainlingList = new RegisterUserOnMainlingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await usecase.registerUserOnMainlingList({ name, email })
    const user = repo.findUserByEmail('any@email.com')
    expect((await user).name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })
  test('should not add userwith  invalid email to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMainlingList = new RegisterUserOnMainlingList(repo)
    const name = 'any_name'
    const invalidemail = 'invalid_email'
    const response = await usecase.registerUserOnMainlingList({ name: name, email: invalidemail })
    const user = await repo.findUserByEmail('any@email.com')
    expect((user)).toBeNull()
    expect(response).toEqual(left(new InvalidEmailError()))
  })
})
