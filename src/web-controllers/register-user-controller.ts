import { UserData } from '../../src/entities'
import { RegisterUserOnMainlingList } from '../../src/usecases/register-user-on-maling-list'
import { HttpRequest, HttpResponse } from './ports'
import { created } from './util/http-helpers'

export class RegisterUserController {
private readonly usecase: RegisterUserOnMainlingList

constructor (usecase: RegisterUserOnMainlingList) {
  this.usecase = usecase
}

public async handle (request: HttpRequest): Promise<HttpResponse> {
  const UserData: UserData = request.body
  const response = await this.usecase.registerUserOnMainlingList(UserData)

  if (response.isRight()) {
    return created(response.value)
  }
}
}
