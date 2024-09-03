import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import express from 'express'
import media from './../../src/middlewares/media'
import fs from 'node:fs/promises'
import path from 'node:path'
import request from 'supertest'

describe('media middleware', () => {
  let app: express.Express

  beforeAll(() => {
    app = express()
    app.use(express.json())
    app.use(
      '/uploads',
      express.static(path.join(__dirname, '../..', 'public', 'uploads'))
    )
    app.post('/upload-category', media('image', 'category'), (req, res) => {
      return res.status(200).json({ imgUrls: req.body.imgUrls })
    })
    app.post('/upload-product', media('image', 'product'), (req, res) => {
      return res.status(200).json({ imgUrls: req.body.imgUrls })
    })
  })

  afterAll(async () => {
    await fs.rm(path.join(__dirname, '../..', 'public'), {
      recursive: true,
      force: true
    })
  })

  test('Should upload a category file successfully', async () => {
    const filePath = path.join(__dirname, '..', 'fixtures', 'test-image.jpeg')

    const response = await request(app)
      .post('/upload-category')
      .set('Content-type', 'multipart/form-data')
      .field('name', 'test-name')
      .attach('image', filePath)

    expect(response.status).toBe(200)

    const imgUrl = response.body.imgUrls[0]

    const response2 = await request(app).get(
      `/uploads/category/${path.basename(imgUrl)}`
    )

    expect(response2.status).toBe(200)
    expect(response2.headers['content-type']).toBe('image/jpeg')
    expect(response2.body).toBeDefined()
  })

  test('Should upload a product file successfully', async () => {
    const filePath = path.join(__dirname, '..', 'fixtures', 'test-image.png')
    const response = await request(app)
      .post('/upload-product')
      .set('Content-type', 'multipart/form-data')
      .field('name', 'test-name')
      .attach('image', filePath)

    expect(response.status).toBe(200)

    const imgUrl = response.body.imgUrls[0]

    const response2 = await request(app).get(
      `/uploads/product/${path.basename(imgUrl)}`
    )

    expect(response2.status).toBe(200)
    expect(response2.headers['content-type']).toBe('image/png')
    expect(response2.body).toBeDefined()
  })
})
