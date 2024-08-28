import request from 'supertest'
import { describe, test, expect, afterAll } from 'vitest'
import App from './../../src/app'
import { AuthRoute } from '../../src/modules/auth/controller'
import HttpStatus from '../../src/lib/http-status'
import prisma from '../../src/lib/prisma'

describe('/auth', async () => {
  const app = new App(3001, 1, 'test', '')
  const server = app.start()
  const api = request(app.expressApp)

  const userToBeCreated = {
    email: 'some_email@gmail.com',
    password: 'somepassword',
    confirmPassword: 'somepassword'
  }

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: userToBeCreated.email
      }
    })
    server.close()
  })

  describe('POST /signup', () => {
    const SIGN_UP_ROUTE = `/api/v1${AuthRoute.PREFIX}${AuthRoute.SIGNUP}`

    test('Should return a status 400 for bad passwords', async () => {
      const response = await api.post(SIGN_UP_ROUTE).send({
        email: 'some@email.com',
        password: 'somepassword',
        configmPassword: 'someotherpassword'
      })

      expect(response.status).toBe(HttpStatus.BAD_REQUEST)
    })

    test('Should return a status 400 for a invalid type', async () => {
      const response = await api.post(SIGN_UP_ROUTE).send({
        email: 'some@email',
        password: 123,
        confirmPassword: '123'
      })

      expect(response.status).toBe(HttpStatus.BAD_REQUEST)
    })

    test('Should return status 201', async () => {
      const response = await api.post(SIGN_UP_ROUTE).send(userToBeCreated)

      expect(response.status).toBe(HttpStatus.CREATED)
      expect(response.body).toHaveProperty('token')
      expect(response.body).toHaveProperty('id')
      expect(response.body).toHaveProperty('email')
    })
  })

  describe('POST /login', () => {
    const LOG_IN_ROUTE = `/api/v1${AuthRoute.PREFIX}${AuthRoute.LOGIN}`
    describe('Not registered user tests', () => {
      test('Should return status 400 for invalid type', async () => {
        const response = await api.post(LOG_IN_ROUTE).send({
          email: 'some@email',
          password: 1234
        })

        expect(response.status).toBe(HttpStatus.BAD_REQUEST)
      })

      test('Shoud return status 404 for user not found', async () => {
        const response = await api.post(LOG_IN_ROUTE).send({
          email: 'some@email.com',
          password: 'somepassword'
        })

        expect(response.status).toBe(HttpStatus.NOT_FOUND)
      })
    })

    describe('Registered user tests', () => {
      test('Should return status 400', async () => {
        const response = await api.post(LOG_IN_ROUTE).send({
          email: userToBeCreated.email,
          password: 'somebadpasswordxd'
        })
        expect(response.status).toBe(HttpStatus.BAD_REQUEST)
      })

      test('Should return status 200', async () => {
        const response = await api.post(LOG_IN_ROUTE).send(userToBeCreated)
        expect(response.status).toBe(HttpStatus.OK)
      })

      test('Should return with a response object', async () => {
        const response = await api.post(LOG_IN_ROUTE).send(userToBeCreated)
        expect(response.status).toBe(HttpStatus.OK)
        expect(response.body).toHaveProperty('token')
        expect(response.body).toHaveProperty('email')
        expect(response.body).toHaveProperty('id')
      })
    })
  })
})
