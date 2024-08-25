import { describe, test, expect } from 'vitest'
import { comparePassword, hashPassword } from './../../src/lib/bcrypt'

describe('Bcrypt test', () => {
  const password = 'some-password-owo'
  const saltRounds = 10

  describe('hassPassword', () => {
    test('Should return a tuple', async () => {
      const tuple = await hashPassword(password, saltRounds)
      expect(Array.isArray(tuple)).toBe(true)
    })

    test('Should return a null error and the password hashed', async () => {
      const [error, passwordHashed] = await hashPassword(password, saltRounds)

      expect(error).toBe(null)
      expect(passwordHashed).toBeDefined()
      expect(typeof passwordHashed).toBe('string')
    })
  })

  describe('comparePassword', async () => {
    const [, passwordHashed] = await hashPassword(password)
    test('Should return a tuple', async () => {
      const tuple = await comparePassword(password, passwordHashed!)

      expect(Array.isArray(tuple)).toBe(true)
    })

    test('Should return a null error and true', async () => {
      const [error, isSamePassword] = await comparePassword(
        password,
        passwordHashed!
      )
      expect(error).toBe(null)
      expect(isSamePassword).toBeDefined()
      expect(isSamePassword).toBe(true)
    })

    test('Should return a null error and false', async () => {
      const [error, isSamePassword] = await comparePassword('', passwordHashed!)

      expect(error).toBe(null)
      expect(isSamePassword).toBeDefined()
      expect(isSamePassword).toBe(false)
    })
  })
})
