import express from 'express'
import request from 'supertest'
import auth from './../../src/middlewares/auth'
import { describe, test, expect, beforeAll, vi, afterAll } from 'vitest'
import HttpStatus from '../../src/lib/enums/http-status'
import * as jwt from './../../src/lib/jwt'

describe('Auth middleware', () => {
  let app: express.Express

  beforeAll(() => {
    app = express()
    app.use(express.json())
    app.use(auth)
    app.get('/test', (req, res) =>
      res.status(HttpStatus.OK).send({ message: 'Sucess' })
    )
  })

  test('Should return status 400 if no auth header is provided', async () => {
    const response = await request(app).get('/test')
    expect(response.status).toBe(HttpStatus.BAD_REQUEST)
  })

  test('Shoud return status 401 if auth header is not bearer', async () => {
    const response = await request(app)
      .get('/test')
      .set('Authorization', 'Basic')
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED)
  })

  test('Should return status 400 if token is not provided', async () => {
    const response = await request(app)
      .get('/test')
      .set('Authorization', 'Bearer ')
    expect(response.status).toBe(HttpStatus.BAD_REQUEST)
  })

  test('Should call next() if token is valid', async () => {
    vi.spyOn(jwt, 'verifyJWT').mockResolvedValue([
      null,
      { context: { user: { id: '123', role: ['CLIENT'] } } }
    ])

    const response = await request(app)
      .get('/test')
      .set('Authorization', 'Bearer validad-token')
    expect(response.status).toBe(HttpStatus.OK)
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })
})
