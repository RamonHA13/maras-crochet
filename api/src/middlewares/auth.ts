import { NextFunction, Request, Response } from 'express'
import { verifyJWT } from '../lib/jwt'
import HttpStatus from '../lib/http-status'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const authHeader = req.headers.authorization
  if (!authHeader)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Auth header don't found" })

  if (!authHeader.toLocaleLowerCase().startsWith('bearer'))
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Bad authorization scheme, use bearer scheme' })

  const token = authHeader.split(' ')[1]
  if (!token)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Bad request, token not found' })

  const [error, data] = await verifyJWT(token)
  if (error instanceof TokenExpiredError)
    return res.status(HttpStatus.BAD_REQUEST).json({ message: 'JWT expired' })

  if (error instanceof JsonWebTokenError)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Bad token', error: error.message })

  if (error)
    return res
      .status(HttpStatus.SERVER_ERROR)
      .json({ message: 'Server error trying to verify the JWT' })

  if (!req.session) {
    req.session = {}
  }

  req.session.user = {
    id: data!.context.user.id,
    role: data!.context.user.role
  }

  next()
}
