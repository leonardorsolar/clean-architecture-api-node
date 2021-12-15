import { InvalidEmailError, InvalidNameError } from '../../../src/entities/errors'
import { User, UserData } from '../../../src/entities'
import { Either, left, right } from '../../shared'
import { UserRepository } from './ports'
import { UseCase } from '../ports'

export class RegisterUserOnMainlingList implements UseCase {
 private readonly userRepo: UserRepository

 constructor (userRepo: UserRepository) {
   this.userRepo = userRepo
 }

 public async perform (request: UserData):
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
