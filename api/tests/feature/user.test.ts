import { describe, test, expect, afterAll, vi } from 'vitest'
import request from 'supertest'
import App from './../../src/app'
import prisma from '../../src/lib/prisma'
import HttpStatus from '../../src/lib/http-status'
import * as jwt from './../../src/lib/jwt'
import UserService from '../../src/modules/users/service'

describe('/users', () => {
  const app = new App(3000, 1, 'test', '')
  const server = app.start()
  const api = request(app.expressApp)

  const userToBeCreated = {
    email: 'some_email@gmail.com',
    password: 'somepassword',
    role: ['CLIENT']
  }

  afterAll(async () => {
    await prisma.user.delete({ where: { email: userToBeCreated.email } })
    server.close()
  })

  describe('GET /', () => {
    test('Should return status 200', async () => {
      vi.spyOn(jwt, 'verifyJWT').mockResolvedValue([
        null,
        { context: { user: { id: '1234', role: ['ADMIN'] } } }
      ])

      const response = await api
        .get('/api/v1/users')
        .set('Authorization', 'Bearer valid-token')

      expect(response.status).toBe(HttpStatus.OK)
    })

    test('Should return an array of objects', async () => {
      vi.spyOn(jwt, 'verifyJWT').mockResolvedValue([
        null,
        { context: { user: { id: '1234', role: ['ADMIN'] } } }
      ])

      const response = await api
        .get('/api/v1/users')
        .set('Authorization', 'Bearer valid-token')

      expect(response.body).toBeTypeOf('object')
      expect(Array.isArray(response.body)).toBe(true)
    })

    test('Should return an array of objects without password', async () => {
      vi.spyOn(jwt, 'verifyJWT').mockResolvedValue([
        null,
        { context: { user: { id: '1234', role: ['ADMIN'] } } }
      ])

      const response = await api
        .get('/api/v1/users')
        .set('Authorization', 'Bearer valid-token')

      response.body.forEach(x => {
        expect(x).not.toHaveProperty('password')
      })
    })
  })

  describe('GET /:id', () => {
    test('Should return status 200', async () => {
      const uuid = crypto.randomUUID()

      vi.spyOn(jwt, 'verifyJWT').mockResolvedValue([
        null,
        {
          context: { user: { id: uuid, role: ['CLIENT'] } }
        }
      ])

      const userService = vi.mocked(UserService.prototype, true)
      userService.getUserById = vi
        .fn()
        .mockResolvedValue([
          null,
          { id: uuid, email: 'test@example.com', role: ['CLIENT'] }
        ])

      const response = await api
        .get('/api/v1/users/' + uuid)
        .set('Authorization', 'Bearer valid-token')

      expect(response.status).toBe(HttpStatus.OK)
      expect(response.body).toEqual({
        id: uuid,
        email: 'test@example.com',
        role: ['CLIENT']
      })
    })
  })

  describe('POST /', () => {
    test('Should return with status 201', async () => {
      vi.spyOn(jwt, 'verifyJWT').mockResolvedValue([
        null,
        {
          context: { user: { id: '123', role: ['SUDO'] } }
        }
      ])
      const response = await api
        .post('/api/v1/users')
        .set('Authorization', 'Bearer valida-token')
        .set('Content-type', 'application/json')
        .send(userToBeCreated)

      expect(response.status).toBe(HttpStatus.CREATED)
      expect(response.body).not.toHaveProperty('password')
    })

    test('Should return with status 403', async () => {
      vi.spyOn(jwt, 'verifyJWT').mockResolvedValue([
        null,
        { context: { user: { id: '345', role: ['CLIENT'] } } }
      ])

      const response = await api
        .post('/api/v1/users')
        .set('Authorization', 'Bearer valida-token')
        .set('Content-type', 'application/json')
        .send(userToBeCreated)
      expect(response.status).toBe(HttpStatus.FORBIDDEN)
    })
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })
})
