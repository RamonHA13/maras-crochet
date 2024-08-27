import express, { type Express } from 'express'
import { type Server } from 'node:http'
import morgan from 'morgan'
import cors from 'cors'
import AuthController, { AuthRoute } from './modules/auth/controller'

export default class App {
  PORT: number
  expressApp: Express
  webOrigin: string
  version: number
  authRoute: string
  env: string

  constructor(port: number, version: number, env: string, webOrigin: string) {
    this.expressApp = express()
    this.PORT = port
    this.version = version
    this.env = env
    this.webOrigin = webOrigin
    this.authRoute = `/api/v${this.version}${AuthRoute.PREFIX}`
  }

  #middlewares(): void {
    this.expressApp.use(
      cors({
        origin: this.webOrigin
      })
    )
    this.expressApp.use(morgan(this.env === 'dev' ? 'dev' : 'common'))
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

    this.expressApp.use(this.authRoute, AuthController)
  }

  start(): Server {
    this.#middlewares()
    this.#routes()
    return this.expressApp.listen(this.PORT, () => {
      console.log('Listening in port: ' + this.PORT)
    })
  }
}
