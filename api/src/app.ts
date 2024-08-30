import express, { type Express } from 'express'
import { type Server } from 'node:http'
import morgan from 'morgan'
import cors from 'cors'

import AuthController, { AuthRoute } from './modules/auth/controller'
import UserController, { UserRoute } from './modules/users/controller'
import ProductController, { ProductsRoute } from './modules/products/controller'
import CategoryController, {
  CategoriesRoute
} from './modules/categories/controller'

import auth from './middlewares/auth'

export default class App {
  PORT: number
  expressApp: Express
  webOrigin: string
  version: number
  env: string

  authRoute: string
  userRoute: string
  productRoute: string
  categoryRoute: string

  constructor(port: number, version: number, env: string, webOrigin: string) {
    this.expressApp = express()
    this.PORT = port
    this.version = version
    this.env = env
    this.webOrigin = webOrigin
    this.authRoute = `/api/v${this.version}${AuthRoute.PREFIX}`
    this.userRoute = `/api/v${this.version}${UserRoute.PREFIX}`
    this.categoryRoute = `/api/v${this.version}${CategoriesRoute.PREFIX}`
    this.productRoute = `/api/v${this.version}${ProductsRoute.PREFIX}`
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
    this.expressApp.use(this.userRoute, auth, UserController)
    this.expressApp.use(this.productRoute, ProductController)
    this.expressApp.use(this.categoryRoute, CategoryController)
  }

  start(): Server {
    this.#middlewares()
    this.#routes()
    return this.expressApp.listen(this.PORT, () => {
      console.log('Listening in port: ' + this.PORT)
    })
  }
}
