import { UserData } from './user-data'
import { Either } from '../share/either'

export class User {
  static create (userData: UserData): Either<InvalidEmailError, User> {

  }
}
