import { InvalidNameError } from './errors/invalid-name-error'
import { Either, left, right } from '../share/either'

export class Name {
    public readonly value: string

    private constructor (name: string) {
      this.value = name
    }

    public static create (name: string): Either<InvalidNameError, Name> {
      if (!Name.validade(name)) {
        return left(new InvalidNameError())
      }

      return right(new Name(name))
    }

    public static validade (name: string) {
      if (!name) {
        return false
      }
      if (name.trim().length < 2 || name.trim().length > 256) {
        return false
      }

      return true
    }
}