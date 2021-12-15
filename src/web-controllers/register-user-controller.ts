import { UserData } from '../../src/entities'
import { RegisterUserOnMainlingList } from '../../src/usecases/register-user-on-maling-list'
import { MissingParamError } from './errors/missing-param-error'
import { HttpRequest, HttpResponse } from './ports'
import { badRequest, created, serverError } from './util/http-helpers'

export class RegisterUserController {
private readonly usecase: RegisterUserOnMainlingList

constructor (usecase: RegisterUserOnMainlingList) {
  this.usecase = usecase
}

public async handle (request: HttpRequest): Promise<HttpResponse> {
  try {
    if (!request.body.name || !request.body.email) {
      let missingParam = !(request.body.name) ? 'name ' : ''
      missingParam += !(request.body.email) ? 'email' : ''
      return badRequest(new MissingParamError(missingParam.trim()))
    }

    const UserData: UserData = request.body
    const response = await this.usecase.registerUserOnMainlingList(UserData)

    if (response.isLeft()) {
      return badRequest(response.value)
    }

    if (response.isRight()) {
      return created(response.value)
    }
  } catch (error) {
    return serverError(error)
  }
}
}
