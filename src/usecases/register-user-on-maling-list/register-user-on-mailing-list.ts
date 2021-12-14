import { InvalidEmailError } from '../../../src/entities/errors/invalid-email-error'
import { InvalidNameError } from '../../../src/entities/errors/invalid-name-error'
import { User } from '../../../src/entities/user'
import { UserData } from '../../../src/entities/user-data'
import { Either, left, right } from '../../share/either'
import { UserRepository } from './ports/user-repository'

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
