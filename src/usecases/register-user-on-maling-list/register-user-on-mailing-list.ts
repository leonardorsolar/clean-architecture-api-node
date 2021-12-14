import { InvalidEmailError, InvalidNameError } from '../../../src/entities/errors'
import { User, UserData } from '../../../src/entities'
import { Either, left, right } from '../../share'
import { UserRepository } from './ports'

export class RegisterUserOnMainlingList {
 private readonly userRepo: UserRepository

 constructor (userRepo: UserRepository) {
   this.userRepo = userRepo
 }

 public async registerUserOnMainlingList (request: UserData):
   Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
   const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(request)
   if (userOrError.isLeft()) {
     return left(userOrError.value)
   }
   if (!(await this.userRepo.exists(request))) {
     await this.userRepo.add(request)
   }
   return right(request)
 }
}
