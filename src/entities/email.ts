export class Email {
  static validate (email: string): boolean {
    if (!email) {
      return false
    }
    const [local, domain] = email.split('@')
    console.log(local)
    if (local.length > 64 || local.length === 0) {
      return false
    }
    if (email.length > 320) {
      return false
    }
    if (domain.length > 255) {
      return false
    }
    return true
  }
}