import { Router } from 'express'
import { authSignupRequest } from './model'

import HttpStatus from '../../lib/http-status'
import AuthService from './service'
import AuthPrismaRepository from './repository/auth-prisma.repository'
import WrongPasswordError from './errors/WrongPasswordError'
import UserNotFoundError from '../../lib/errors/UserNotFoundError'

const router = Router()
export enum AuthRoute {
  PREFIX = '/auth',
  LOGIN = '/login',
  SIGNUP = '/signup',
  GOOGLE_LOGIN = '/google/login',
  GOOGLE_SIGNUP = '/google/signup'
}

const authPrismaRepository = new AuthPrismaRepository()
const service = new AuthService(authPrismaRepository)

router.post(AuthRoute.LOGIN, async (req, res) => {
  const { email, password } = req.body
  const result = await authSignupRequest.safeParseAsync({
    email,
    password
  })

  if (!result.success)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Bad request', error: result.error.errors })

  const [error, responseDto] = await service.login(email, password)

  if (error instanceof UserNotFoundError)
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: 'User not registered' })

  if (error instanceof WrongPasswordError)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Bad password provided' })

  if (error)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: 'Server error', error })

  return res.status(HttpStatus.OK).json(responseDto)
})

router.post(AuthRoute.SIGNUP, async (req, res) => {
  const { email, password, confirmPassword } = req.body
  if (password !== confirmPassword)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Invalid confirm password' })

  const result = await authSignupRequest.safeParseAsync({
    email,
    password
  })

  if (!result.success)
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: 'Bad request',
      error: result.error.errors
    })

  const [error, responseDto] = await service.signup(email, password)

  if (error)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: 'Server error', error })

  return res.status(HttpStatus.CREATED).json(responseDto)
})

export default router
