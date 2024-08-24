import express, { type Express } from 'express'
import { type Server } from 'node:http'
import morgan from 'morgan'
import cors from 'cors'

export default class App {
  PORT: number
  expressApp: Express
  webOrigin: string
  version: number

  constructor(port: number, version: number, webOrigin: string) {
    this.PORT = port
    this.expressApp = express()
    this.webOrigin = webOrigin
    this.version = version
  }

  #middlewares(): void {
    this.expressApp.use(
      cors({
        origin: this.webOrigin
      })
    )
    this.expressApp.use(morgan('dev'))
    this.expressApp.use(express.json())
  }

  #routes(): void {
    this.expressApp.get('/', (_, res) => {
      res.redirect(`/api/v${this.version}/`)
    })

    this.expressApp.get(`/api/v${this.version}/`, (req, res) => {
      const serverUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
      return res
        .json({
          products: `${serverUrl}products`
        })
        .send()
    })
  }

  start(): Server {
    this.#middlewares()
    this.#routes()
    return this.expressApp.listen(this.PORT, () => {
      console.log('Listening in port: ' + this.PORT)
    })
  }
}
