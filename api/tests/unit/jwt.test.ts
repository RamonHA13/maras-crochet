import { describe, test, expect } from 'vitest'
import { signJWT, verifyJWT } from '../../src/lib/jwt'

describe('JWT', () => {
  describe('signJWT', () => {
    test('Should return a string', () => {
      const token = signJWT(crypto.randomUUID(), 'some@email', 'client')

      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
    })
  })

  describe('verifyJWT', () => {
    test('Should return the decoded token', async () => {
      const token = signJWT(crypto.randomUUID(), 'some@email', 'client')
      const [error, decoded] = await verifyJWT(token)
      console.log(decoded)
      expect(error).toBe(null)
      expect(decoded).toBeDefined()
      expect(decoded).toHaveProperty('sub')
      expect(decoded).toHaveProperty('exp')
    })

    test('Should return an error for an invalid token', async () => {
      const invalidToken = 'invalid.tokeb.wtf'
      const [error, decoded] = await verifyJWT(invalidToken)

      expect(error).toBeDefined()
      expect(decoded).toBeNull()
    })

    test('Should return an error for an expired token', async () => {
      const expiredToken = signJWT(
        crypto.randomUUID(),
        'some@email',
        'client',
        '1ms'
      )
      await new Promise(resolve => setTimeout(resolve, 10)) // Waits to expire the token

      const [error, decoded] = await verifyJWT(expiredToken)

      expect(error).toBeDefined()
      expect((error as Error).message).toMatch(/jwt expired/i)
      expect(decoded).toBe(null)
    })
  })
})
