import { Email } from './email'

describe('Email validation', () => {
  test('should not accept null string', () => {
    const email = null as any
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty string', () => {
    const email = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should accept valid email', () => {
    const email = 'any@mail.com'
    expect(Email.validate(email)).toBeTruthy()
  })

  test('should not accept local part larger than 64 chars', () => {
    const email = 'l'.repeat(65) + '@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept domanin part larger than 255 chars', () => {
    const email = 'local@' + 'd'.repeat(128) + '.' + 'cd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept strings larger than 320 chars', () => {
    const email = 'c'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'cd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty local part', () => {
    const email = '@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty domain', () => {
    const email = 'any@'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept domain with a part large that 63 chars', () => {
    const email = 'any@' + 'd'.repeat(64) + '.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with invalid char', () => {
    const email = 'any email@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
  test('should not accept local part with two dots', () => {
    const email = 'an..email@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
  test('should not accept local part with ending dot', () => {
    const email = 'any.@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
  test('should not accept email without anat-sign', () => {
    const email = 'anymail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
