import { comparePassword, hashPassword } from '../../lib/bcrypt'
import { signJWT } from '../../lib/jwt'
import { ReturnTuple } from '../../lib/types'
import UserNotFoundError from '../../lib/errors/UserNotFoundError'
import WrongPasswordError from './errors/WrongPasswordError'
import { AuthData, AuthResponseDto, LoginData } from './model'
import AuthRepository from './repository/repository'

export interface IAuthService {
  login: (
    email: string,
    password: string
  ) => Promise<ReturnTuple<AuthResponseDto>>
  signup: (
    email: string,
    password: string
  ) => Promise<ReturnTuple<AuthResponseDto>>
}

export default class AuthService implements IAuthService {
  repository: AuthRepository<AuthData, LoginData>

  constructor(repository: AuthRepository<AuthData, LoginData>) {
    this.repository = repository
  }

  async login(
    email: string,
    password: string
  ): Promise<ReturnTuple<AuthResponseDto>> {
    try {
      const user = await this.repository.get(email)
      if (!user) return [new UserNotFoundError(), null]
      const [error, isSame] = await comparePassword(password, user.password)

      if (error) return [error, null]
      if (!isSame) return [new WrongPasswordError(), null]

      const responseDto: AuthResponseDto = {
        id: user.id,
        email: user.email,
        token: signJWT(user.id, user.email, user.role)
      }

      return [null, responseDto]
    } catch (error) {
      return [error, null]
    }
  }

  async signup(
    email: string,
    password: string
  ): Promise<ReturnTuple<AuthResponseDto>> {
    try {
      const [err, hashedPassword] = await hashPassword(password)
      if (err) return [err, null]

      const user = await this.repository.create(email, hashedPassword!)
      const responseDto: AuthResponseDto = {
        id: user.id,
        email: user.email,
        token: signJWT(user.id, user.email, ['CLIENT'])
      }
      return [null, responseDto]
    } catch (error) {
      return [error, null]
    }
  }
}
