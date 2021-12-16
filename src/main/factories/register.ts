import { RegisterUserController } from '../../web-controllers/register-user-controller'
import { RegisterUserOnMainlingList } from '../../usecases/register-user-on-maling-list'
import { InMemoryUserRepository } from '../../usecases/repository/InMemoryUserRepository'

export const makeRegisterUserController = (): RegisterUserController => {
  const inMemoryUserRepository = new InMemoryUserRepository([])
  const registerUserOnMainlingList = new RegisterUserOnMainlingList(inMemoryUserRepository)
  const registerUserController = new RegisterUserController(registerUserOnMainlingList)
  return registerUserController
}
