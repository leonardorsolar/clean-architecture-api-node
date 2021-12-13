import { UserData } from '../../entities/user-data'
import { InMemoryUserRepository } from './InMemoryUserRepository'

describe('In Mmemory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any@mail.com')
    expect(user).toBeNull()
  })

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'any_name'
    const email = 'any@mail.com'
    const userRepo = new InMemoryUserRepository(users)
    await userRepo.add({ name, email })
    const user = await userRepo.findUserByEmail('any@mail.com')
    expect(user.name).toBe('any_name')
  })
})

// ZOMBIES: Z - Zero ( nada no repositorio)
// O - Um (adicionar o usuário e tentar recuperar)
// M - Muitos (ou mais complexos)
// B - Comportamentos de limite
// I - definição de interface
// E - Exercício de comportamento excepcional
// S - Cenários Simples, Soluções Simples
