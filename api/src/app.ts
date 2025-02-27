import { type Server } from 'node:http'
import path from 'node:path'
import express, { type Express } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import AuthController, { AuthRoute } from './modules/auth/controller'
import UserController, { UserRoute } from './modules/users/controller'
import ProductController, { ProductsRoute } from './modules/products/controller'
import CategoryController, {
  CategoriesRoute
} from './modules/categories/controller'
import UserFavoriteController, {
  UserFavoriteRoute
} from './modules/user-favorites/controller'

import auth from './middlewares/auth'
import getServerUrl from './lib/getServerUrl'

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
  userFavoritesRoute: string

  constructor(port: number, version: number, env: string, webOrigin: string) {
    this.expressApp = express()
    this.PORT = port
    this.version = version
    this.env = env
    this.webOrigin = webOrigin
    this.authRoute = `/api/v${this.version}${AuthRoute.PREFIX}`
    this.userRoute = `/api/v${this.version}${UserRoute.PREFIX}`
    this.productRoute = `/api/v${this.version}${ProductsRoute.PREFIX}`
    this.categoryRoute = `/api/v${this.version}${CategoriesRoute.PREFIX}`
    this.userFavoritesRoute = `/api/v${this.version}${UserFavoriteRoute.PREFIX}`
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
      const serverUrl = getServerUrl(req, true)
      return res
        .json({
          products: `${serverUrl}products`
        })
        .send()
    })

    this.expressApp.use(express.static(path.join(__dirname, '..', '/public')))

    this.expressApp.use(this.authRoute, AuthController)
    this.expressApp.use(this.userRoute, auth, UserController)
    this.expressApp.use(this.productRoute, ProductController)
    this.expressApp.use(this.categoryRoute, CategoryController)
    this.expressApp.use(this.userFavoritesRoute, auth, UserFavoriteController)
  }

  start(): Server {
    this.#middlewares()
    this.#routes()
    return this.expressApp.listen(this.PORT, () => {
      console.log('Listening in port: ' + this.PORT)
    })
  }
}
